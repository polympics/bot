/** Tool for registering commands with Discord. */
import axios from 'axios';
import { commands } from './worker_src/commands/index';
import {
    Command,
    CommandGroup,
    CommandOption,
    OptionType,
} from './worker_src/command_types';
import {
    DISCORD_API_URL,
    DISCORD_AUTH_HEADER,
    DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID,
} from './project_config';

/** Serialise a command option for sending to the API. */
function serialiseCommandOption(option: CommandOption) {
    const data: Record<string, any> = {
        name: option.name,
        description: option.description,
    };
    data.type = option.type || OptionType.STRING;
    if (option.required) {
        data.required = true;
    }
    if (option.choices) {
        data.choices = Object.entries(option.choices).map(([name, value]) => ({
            name: name,
            value: value,
        }));
    }
    return data;
}

/** Serialise a command or subcommand for sending to the API. */
function serialiseCommand(command: Command | CommandGroup, topLevel = true) {
    const data: Record<string, any> = {
        name: command.name,
        description: command.description,
    };
    if (!topLevel) {
        data.type = 'callback' in command ? 1 : 2;
    }
    if ('callback' in command) {
        if (command.options) {
            data.options = command.options.map(serialiseCommandOption);
        }
    } else {
        data.options = Object.values(command.subcommands).map(subcommand =>
            serialiseCommand(subcommand, false)
        );
    }
    return data;
}

/** Make a request to the Discord application endpoint.
 *
 * Prepends /applications/ to endpoints, or, if the DISCORD_GUILD_ID
 * envvar is set, /applications/guilds/{guild.id}/.
 */
async function request(
    method: 'GET' | 'POST' | 'DELETE',
    endpoint: string,
    {
        data = null,
    }: {
        data?: Record<string, any> | null;
    } = {}
) {
    let fullEndpoint = `${DISCORD_API_URL}/applications/${DISCORD_CLIENT_ID}/`;
    if (DISCORD_GUILD_ID) {
        fullEndpoint += `guilds/${DISCORD_GUILD_ID}/`;
    }
    fullEndpoint += endpoint;
    const reqOptions: Record<string, any> = {
        method: method,
        url: fullEndpoint,
        headers: {
            Authorization: DISCORD_AUTH_HEADER,
        },
    };
    if (data) {
        reqOptions.data = data;
    }
    const response = await axios(reqOptions);
    return response.data;
}

/** Deletes all existing commands. */
async function clearCommands() {
    const data = await request('GET', 'commands');
    await Promise.all(
        data.map((command: Record<string, any>) => {
            return request('DELETE', `commands/${command.id}`);
        })
    );
}

/** Creates a command. */
async function createCommand(command: Command | CommandGroup) {
    await request('POST', 'commands', { data: serialiseCommand(command) });
}

/** Creates all commands, after first clearing commands. */
async function createAllCommands() {
    await clearCommands();
    await Promise.all(Object.values(commands).map(createCommand));
}

createAllCommands().then(() => {
    console.log('Done!');
});

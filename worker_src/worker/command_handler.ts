/** Handle slash command callbacks. */
import { commands } from '../commands/index';
import { Command } from '../command_types';
import {
    CommandResponse,
    Member,
    SlashCommandData,
    SlashCommandInteractionData,
    SlashCommandInteractionDataOption,
    User,
} from '../api_types';

/** Parse and store command interaction data. */
export class CommandContext {
    id: string;
    responseToken: string;
    guildId: string | null;
    channelId: string | null;
    member: Member | null;
    user: User;
    commandNameParts: Array<string>;
    options: Record<string, any>;
    command: Command | null;

    /** Store the data. */
    constructor(data: SlashCommandData) {
        this.id = data.id;
        this.responseToken = data.token;
        this.channelId = data.channel_id || null;
        if ('guild_id' in data) {
            this.guildId = data.guild_id;
            this.member = data.member;
            this.user = data.member.user;
        } else {
            this.guildId = null;
            this.member = null;
            this.user = data.user;
        }
        this.commandNameParts = [];
        this.options = {};
        this.parseOptions(data.data);
        this.command = this.getCommand();
    }

    /** Parse a key/value pair or subcommand. */
    parseOptions(
        data: SlashCommandInteractionData | SlashCommandInteractionDataOption
    ) {
        if ('value' in data) {
            // It's a key/value pair.
            this.options[data.name] = data.value;
        } else {
            // It's a subcommand or subcommand group.
            this.commandNameParts.push(data.name);
            if (data.options) {
                for (const option of data.options) {
                    this.parseOptions(option);
                }
            }
        }
    }

    /** Get the callback for this specific command. */
    getCommand() {
        let command = commands[this.commandNameParts[0]];
        for (const namePart of this.commandNameParts.slice(1)) {
            if ('subcommands' in command) {
                command = command.subcommands[namePart];
            }
        }
        if ('subcommands' in command) {
            console.warn(
                `Command "${this.commandNameParts.concat(' ')}" not found. ` +
                    "Make sure you've registered the latest commands."
            );
            return null;
        }
        return command;
    }

    /** Call this command's callback, providing this context. */
    async call() {
        if (!this.command) {
            return { content: 'Internal error - command not found.' };
        }
        return await this.command.callback(this, this.options);
    }
}

/** Get and use data from a command callback. */
export async function commandHandler(
    _request: Request,
    data: SlashCommandData
) {
    const context = new CommandContext(data);
    const commandResponse: CommandResponse = await context.call();
    return { type: 4, data: commandResponse };
}

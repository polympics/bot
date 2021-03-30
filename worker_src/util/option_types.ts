/** Various option types for commands. */
import { Account, DataError, PolympicsPermissions } from 'polympics';
import { getOwnAccount } from '.';
import { CommandOption, OptionType } from '../command_types';
import { CommandContext } from '../worker/command_handler';
import { client } from './client';
import { Result } from './results';

export const permissionOptions: Array<CommandOption> = [];

for (const [name, value] of Object.entries(PolympicsPermissions)) {
    if (!(typeof value === 'number')) continue;
    const nameParts = name.replace(/([A-Z])/g, ' $1').split(' ');
    const snakeCase = nameParts.join('_');
    const titleCase = nameParts
        .map(part => part.charAt(0).toUpperCase() + part.substr(1))
        .join(' ');
    const choices: Record<string, number> = {};
    choices[titleCase] = <number>value;
    permissionOptions.push({
        name: snakeCase,
        description: `The ${titleCase.toLowerCase()} permission.`,
        type: OptionType.INTEGER,
        choices: choices,
    });
}

export const userOption = {
    name: 'user',
    description: 'The player, defaults to yourself.',
    type: OptionType.USER,
};

export async function resolveUserOption(
    context: CommandContext,
    args: Record<string, any>
): Promise<Result<Account>> {
    if (args.user) {
        try {
            return { value: await client.getAccount(args.user) };
        } catch (err) {
            if (!(err instanceof DataError)) throw err;
            return { message: 'This user has not yet registered.' };
        }
    } else {
        return await getOwnAccount(context);
    }
}

export const teamOption = {
    name: 'team',
    description: 'The team, defaults to your own.',
    type: OptionType.STRING,
};

export const optionalTeamOption = {
    name: 'team',
    description: 'The team, leave empty for no team.',
    type: OptionType.STRING,
};

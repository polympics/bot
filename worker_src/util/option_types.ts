/** Various option types for commands. */
import { PolympicsPermissions } from "polympics";
import { CommandOption, OptionType } from "../command_types";

export const permissionOptions: Array<CommandOption> = [];

for (const [name, value] of Object.entries(PolympicsPermissions)) {
    if (!(typeof value === 'number')) continue;
    const nameParts = name.replace(/([A-Z])/g, ' $1').split(' ');
    const snakeCase = nameParts.join('_');
    const titleCase = nameParts.map(part =>
        part.charAt(0).toUpperCase() + part.substr(1)).join(' ');
    const choices: Record<string, number> = {};
    choices[titleCase] = <number>value;
    permissionOptions.push({
        name: snakeCase,
        description: `The ${titleCase.toLowerCase()} permission.`,
        type: OptionType.INTEGER,
        choices: choices
    });
}

export const userOption = {
    name: 'user',
    description: 'The player, defaults to yourself.',
    type: OptionType.USER
};

export const teamOption = {
    name: 'team',
    description: 'The team, defaults to your own.',
    type: OptionType.STRING
};

export const optionalTeamOption = {
    name: 'team',
    description: 'The team, leave empty for no team.',
    type: OptionType.STRING
};

/** Types for the command handler system. */
import { CommandContext } from './worker/command_handler';
import { CommandResponse } from './api_types';

/** The type of a command parameter. */
export const enum OptionType {
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
}

/** A command, subcommand or subcommand group. */
export interface BaseCommand {
    name: string;
    description: string;
}

/** A parameter to a command or subcommand. */
export interface CommandOption extends BaseCommand {
    type?: OptionType;
    required?: boolean;
    choices?: Record<string, string | number>;
}

/** A command or subcommand. */
export interface Command extends BaseCommand {
    options: Array<CommandOption>;
    callback: (
        ctx: CommandContext,
        args: Record<string, any>
    ) => Promise<CommandResponse>;
}

/** A group of subcommands. */
export interface CommandGroup extends BaseCommand {
    subcommands: Array<Command | CommandGroup>;
}

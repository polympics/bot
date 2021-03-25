import { Command, CommandGroup } from '../command_types';
import test from './test';

export const commands: Record<string, Command | CommandGroup> = {
    test,
};

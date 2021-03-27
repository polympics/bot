import { Command, CommandGroup } from '../command_types';
import teams from './teams/index';
import register from './register';
import users from './users/index';

export const commands: Record<string, Command | CommandGroup> = {
    register,
    users,
    teams
};

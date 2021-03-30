import list from './list';
import create from './create';
import rename from './rename';
import deleteTeam from './delete';
import view from './view';

export default {
    name: 'teams',
    description: 'Manage, create or view teams.',
    subcommands: { view, list, create, rename, delete: deleteTeam },
};

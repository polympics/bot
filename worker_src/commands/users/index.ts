import setTeam from './team';
import sync from './sync';
import grant from './grant';
import revoke from './revoke';
import deleteUser from './delete';
import view from './view';

export default {
    name: 'users',
    description: 'Manage, create or view accounts.',
    subcommands: [
        view,
        setTeam,
        sync,
        grant,
        revoke,
        deleteUser
    ]
};

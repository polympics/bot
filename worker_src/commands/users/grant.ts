import { CommandResponse } from '../../api_types';
import { CommandContext } from '../../worker/command_handler';
import { permissionOptions, userOption } from '../../util/option_types';

export default {
    name: 'grant',
    description: 'Give a user permissions.',
    options: [
        userOption,
        ...permissionOptions
    ],
    callback: async function(
        context: CommandContext, args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`
        };
    },
};

import { CommandResponse } from '../../api_types';
import { CommandContext } from '../../worker/command_handler';
import { userOption } from '../../util/option_types';

export default {
    name: 'sync',
    description: 'Sync an account with Discord.',
    options: [
        userOption
    ],
    callback: async function(
        context: CommandContext, args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`
        };
    },
};

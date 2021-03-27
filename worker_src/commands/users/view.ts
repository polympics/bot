import { CommandResponse } from '../../api_types';
import { userOption } from '../../util/option_types';
import { CommandContext } from '../../worker/command_handler';

export default {
    name: 'view',
    description: 'Get someone\'s account details.',
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

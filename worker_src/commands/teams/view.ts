import { CommandResponse } from '../../api_types';
import { teamOption } from '../../util/option_types';
import { CommandContext } from '../../worker/command_handler';

export default {
    name: 'team',
    description: 'Get information on a team.',
    options: [
        teamOption
    ],
    callback: async function(
        context: CommandContext, args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`
        };
    },
};

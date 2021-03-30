import { CommandResponse } from '../../api_types';
import { CommandContext } from '../../worker/command_handler';
import { teamOption } from '../../util/option_types';

export default {
    name: 'delete',
    description: 'Delete an team.',
    options: [teamOption],
    callback: async function(
        context: CommandContext,
        args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`,
        };
    },
};

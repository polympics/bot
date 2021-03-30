import { CommandResponse } from '../../api_types';
import { CommandContext } from '../../worker/command_handler';
import { userOption, optionalTeamOption } from '../../util/option_types';

export default {
    name: 'set-team',
    description: "Set a player's team.",
    options: [userOption, optionalTeamOption],
    callback: async function(
        context: CommandContext,
        args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`,
        };
    },
};

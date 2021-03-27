import { CommandResponse } from '../../api_types';
import { OptionType } from '../../command_types';
import { teamOption } from '../../util/option_types';
import { CommandContext } from '../../worker/command_handler';

export default {
    name: 'rename',
    description: 'Rename a team.',
    options: [
        teamOption,
        {
            name: 'name',
            description: 'The new name of the new team.',
            type: OptionType.STRING,
            optional: false
        }
    ],
    callback: async function(
        context: CommandContext, args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`
        };
    },
};

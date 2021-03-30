import { CommandResponse } from '../../api_types';
import { OptionType } from '../../command_types';
import { CommandContext } from '../../worker/command_handler';

export default {
    name: 'create',
    description: 'Create a new team.',
    options: [
        {
            name: 'name',
            description: 'The name of the new team.',
            type: OptionType.STRING,
            optional: false,
        },
    ],
    callback: async function(
        context: CommandContext,
        args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`,
        };
    },
};

import { CommandResponse } from '../../api_types';
import { OptionType } from '../../command_types';
import { CommandContext } from '../../worker/command_handler';

export default {
    name: 'list',
    description: 'Get a list of teams.',
    options: [
        {
            name: 'search',
            description: 'Narrow results by searching.',
            type: OptionType.STRING,
        },
        {
            name: 'page',
            description: 'View a different page (default 1).',
            type: OptionType.INTEGER,
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

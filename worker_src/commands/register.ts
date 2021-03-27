import { CommandResponse } from '../api_types';
import { CommandContext } from '../worker/command_handler';

export default {
    name: 'register',
    description: 'Register for Polympics.',
    options: [],
    callback: async function(
        context: CommandContext, args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`
        };
    },
};

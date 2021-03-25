import { CommandResponse } from '../api_types';
import { CommandContext } from '../worker/command_handler';

export default {
    name: 'test',
    description: 'A test command.',
    options: [],
    callback: async function(
        context: CommandContext,
        {}
    ): Promise<CommandResponse> {
        return {
            content: 'Hello Discord Slash Commands + Cloudflare Workers world!',
        };
    },
};

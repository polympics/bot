import { CommandResponse } from '../../api_types';
import { OptionType } from '../../command_types';
import { CommandContext } from '../../worker/command_handler';
import { permissionOptions, userOption } from '../../util/option_types';

export default {
    name: 'revoke',
    description: 'Remove permissions from a user.',
    options: [userOption, ...permissionOptions],
    callback: async function(
        context: CommandContext,
        args: Record<string, any>
    ): Promise<CommandResponse> {
        return {
            content: `You provided the args: ${JSON.stringify(args)}`,
        };
    },
};

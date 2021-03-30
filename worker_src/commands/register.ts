import { CommandResponse, User } from '../api_types';
import { CommandContext } from '../worker/command_handler';
import { client } from '../util/client';
import { DISCORD_CDN_URL } from '../../project_config';
import { ClientError } from 'polympics';

function getAvatarUrl(user: User): string {
    if (user.avatar) {
        return `${DISCORD_CDN_URL}/avatars/${user.id}/${user.avatar}.png`;
    }
    const defaultAvatarNumber = Number.parseInt(user.discriminator) % 5;
    return `${DISCORD_CDN_URL}/embed/avatars/${defaultAvatarNumber}.png`;
}

export default {
    name: 'register',
    description: 'Register for Polympics.',
    options: [],
    callback: async function(
        context: CommandContext,
        args: Record<string, any>
    ): Promise<CommandResponse> {
        try {
            await client.createAccount({
                id: context.user.id,
                name: context.user.username,
                discriminator: context.user.discriminator,
                avatarUrl: getAvatarUrl(context.user),
            });
        } catch (error) {
            if (!(error instanceof ClientError)) throw error;
            if (error.code !== 409) throw error;
            return { content: 'You are already registered.' };
        }
        return { content: 'Registered you!' };
    },
};

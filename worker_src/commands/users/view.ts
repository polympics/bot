import { Account, PolympicsPermissions } from 'polympics';
import { CommandResponse } from '../../api_types';
import { resolveUserOption, userOption } from '../../util/option_types';
import { CommandContext } from '../../worker/command_handler';
import { errorOr } from '../../util/results';

async function view(account: Account): Promise<CommandResponse> {
    const badges = [
        account.team ? account.team.name : ':rainbow_flag: No team',
    ];
    if (account.permissions & PolympicsPermissions.manageOwnTeam) {
        badges.push(':crown: Team Owner');
    }
    if (
        account.permissions &
        (PolympicsPermissions.manageAccountDetails |
            PolympicsPermissions.manageAccountTeams |
            PolympicsPermissions.managePermissions |
            PolympicsPermissions.manageTeams)
    ) {
        badges.push(':gear: Polympics Admin');
    }
    return {
        embeds: [
            {
                title: `${account.name}#${account.discriminator}`,
                thumbnail: { url: account.avatarUrl },
                description: badges.join('\n'),
                footer: {
                    text: 'Registered at',
                },
                timestamp: account.createdAt.toISOString(),
                color: 0xcc2b31,
            },
        ],
    };
}

export default {
    name: 'view',
    description: "Get someone's account details.",
    options: [userOption],
    callback: async function(
        context: CommandContext,
        args: Record<string, any>
    ): Promise<CommandResponse> {
        const accountArg = await resolveUserOption(context, args);
        return await errorOr(accountArg, view);
    },
};

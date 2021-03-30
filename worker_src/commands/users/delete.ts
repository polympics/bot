import { CommandResponse } from '../../api_types';
import { CommandContext } from '../../worker/command_handler';
import { resolveUserOption, userOption } from '../../util/option_types';
import { errorOr } from '../../util/results';
import { getOwnAccount } from '../../util';
import { Account, PolympicsPermissions } from 'polympics';
import { client } from '../../util/client';

async function deleteAccount(
    ownAccount: Account,
    targetAccount: Account
): Promise<CommandResponse> {
    if (ownAccount.id !== targetAccount.id) {
        if (
            !(
                ownAccount.permissions &
                PolympicsPermissions.manageAccountDetails
            )
        ) {
            return {
                content: "You don't have permissions to delete this account.",
            };
        }
    }
    await client.deleteAccount(targetAccount);
    return { content: 'Deleted account :(' };
}

export default {
    name: 'delete',
    description: 'Delete an account.',
    options: [userOption],
    callback: async function(
        context: CommandContext,
        args: Record<string, any>
    ): Promise<CommandResponse> {
        const ownAccount = await getOwnAccount(context);
        return await errorOr(ownAccount, async function(ownAccount) {
            const targetAccount = await resolveUserOption(context, args);
            return await errorOr(targetAccount, async function(targetAccount) {
                return await deleteAccount(ownAccount, targetAccount);
            });
        });
    },
};

/** General utils. */
import { Account, DataError } from 'polympics';
import { CommandContext } from '../worker/command_handler';
import { client } from './client';
import { Result } from './results';

export async function getOwnAccount(
    context: CommandContext
): Promise<Result<Account>> {
    try {
        return { value: await client.getAccount(context.user.id) };
    } catch (error) {
        if (!(error instanceof DataError)) throw error;
        return { message: 'You have not yet registered (do /register).' };
    }
}

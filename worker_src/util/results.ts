/** Utility for error/non-error results. */

import { CommandResponse } from '../api_types';

/** A non-error result. */
export interface ResultOk<T> {
    value: T;
}

/** An error result. */
export interface ResultError {
    message: string;
}

/** A result, either an error or a value. */
export type Result<T> = ResultOk<T> | ResultError;

/** Call a function with the value of a result if OK,
 * otherwise return an error message.
 */
export async function errorOr<T>(
    result: Result<T>,
    ifOk: (value: T) => Promise<CommandResponse>
): Promise<CommandResponse> {
    if ('value' in result) {
        return await ifOk(result.value);
    } else {
        return { content: result.message };
    }
}

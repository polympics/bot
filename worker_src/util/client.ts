/** Initialise the Polympics client. */
import { AppClient } from 'polympics';
import {
    POLYMPICS_API_URL,
    POLYMPICS_USERNAME,
    POLYMPICS_PASSWORD,
} from '../../project_config';

export const client = new AppClient({
    credentials: {
        username: POLYMPICS_USERNAME,
        password: POLYMPICS_PASSWORD,
    },
    apiUrl: POLYMPICS_API_URL,
});

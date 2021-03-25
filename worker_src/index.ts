/** Entry point for the cloudflare worker. */
import { handleRequest } from './worker/index';

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

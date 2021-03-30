/** Handle signature validation and determine event type. */
import nacl from 'tweetnacl';
import { commandHandler } from './command_handler';
import {
    InteractionData,
    InteractionResponse,
    InteractionType,
    PingInteractionData,
} from '../api_types';
import { DISCORD_PUBLIC_KEY } from '../../project_config';

/** Convert a hex string to a Uint8Array */
function hexToBytes(hexString: string): Uint8Array | null {
    const pairs = hexString.match(/.{2}/g);
    if (!pairs) return null;
    return new Uint8Array(pairs.map(byte => parseInt(byte, 16)));
}

/** Validate the signature header. */
function validateSignature(request: Request, body: string): boolean {
    const rawSignature = request.headers.get('X-Signature-Ed25519');
    const timestamp = request.headers.get('X-Signature-Timestamp');
    if (rawSignature == null || timestamp == null) return false;
    const message = new TextEncoder().encode(timestamp + body);
    const signature = hexToBytes(rawSignature);
    if (!signature) return false;
    const publicKey = hexToBytes(DISCORD_PUBLIC_KEY)!;
    return nacl.sign.detached.verify(message, signature, publicKey);
}

/** Respond to a ping event with a pong. */
async function pingHandler(
    _request: Request,
    _data: PingInteractionData
): Promise<InteractionResponse> {
    return { type: 1 };
}

/** Handle any request. */
async function handleRequest(request: Request) {
    const body = await request.text();
    if (!validateSignature(request, body)) {
        return new Response('Invalid signature.', { status: 401 });
    }
    const data: InteractionData = JSON.parse(body);
    let resp: InteractionResponse;
    switch (data.type) {
        case InteractionType.PING:
            resp = await pingHandler(request, data);
            break;
        case InteractionType.SLASH_COMMAND:
            resp = await commandHandler(request, data);
            break;
        default:
            return new Response('Unkown event type.', { status: 422 });
    }
    return new Response(JSON.stringify(resp), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export { handleRequest };

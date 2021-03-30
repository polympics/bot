# Polympics Serverless Bot

A serverless Discord bot to act as a frontend to the API, using Discord slash commands and a Cloudflare worker.

## Setup

1. Create the config files:

    ```bash
    $ cp wrangler.toml.example wrangler.toml
    $ cp project_config.ts.example project_config.ts
    ```

2. Install [Node JS](https://nodejs.org).
3. Install dependencies with `npm install --save-dev`.
4. Authenticate `wrangler`: `npx wrangler login`.
5. Get your account ID with `npx wrangler whoami`, then replace the account ID in `wrangler.toml` with it.
6. Fill in the values in `project_config.ts`. Some values can be found on the [Discord Developer Portal](https://discord.com/developers/applications), others by contacting the Polympics server admin.
7. Run `npm run register` to register the available commands with Discord.
8. Run `npx wrangler publish` to publish!

## Contributing

Please make sure to format code with `npm run format` before committing. You can run a local server with `npx wrangler dev`, but for this to be any use Discord requires that it must run over HTTPS, which I haven't worked out yet. I recommend just running a test copy of the worker and getting logs with `npx wrangler tail`.

# Livekit + Svelte = 🦾

This repo contains a small VOIP application built using [SvelteKit](https://kit.svelte.dev), [LiveKit](https://livekit.io) and [TailwindCSS](https://tailwindcss.com). 

To get it set up, you only need to do a few short setup steps.

1. Place the ip for the host you are running on into [`docker-compose.yml`](./docker-compose.yml)
   - (Hint: it goes in the `command` property for the `sfu` `service`)
1. Generate an access token / secret pair
   1. At time of writing, this can be done with the following command:  
      `docker run --rm livekit/livekit-server generate-keys`
   1. Place your access token into `/secret/lk_access_token`
   1. Place your secret key into `/secret/lk_access_key`
   1. Place both into `/server-config.yml` as a key value pair for `keys` (i.e. `access_token: secret_key`)
1. Run `docker-compose up`, and connect to the instance at [localhost:3000](localhost:3000)

1. If you are going to be connecting to a local instance (i.e. from one machine to another via LAN), you will need to configure your browser to allow [the browser to access your microphone and camera](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) on a *specific* insecure host. For Google Chrome, you can do so with [this](brave://flags/#unsafely-treat-insecure-origin-as-secure) flag (it should look like `http://x.x.x.x:3000`). To read more about why this step is needed, the chromium project has a good writeup on why they made the restriction [here](https://www.chromium.org/Home/chromium-security/deprecating-powerful-features-on-insecure-origins).
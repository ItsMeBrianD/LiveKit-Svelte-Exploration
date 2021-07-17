import type { EndpointOutput, Request } from "@sveltejs/kit";
import {AccessToken} from 'livekit-server-sdk'
import config from "$lib/config";
// TODO: Environment var these


export function get({params, query}: Request): EndpointOutput {
    const participant = query.get('user');
    if(!participant) {
        return {
            status: 400,
            body: "Missing required query parameter `user`"
        }
    }
    console.log(config);
    const roomName = params.roomName;
    const at = new AccessToken(config.lk_access_token, config.lk_secret_key, {identity: participant})
    at.addGrant({
        roomJoin: true, room: roomName, canPublish: true, canSubscribe: true
    });
    
    return {body: {
        token: at.toJwt(),
        url: config.lk_url
    }};
}
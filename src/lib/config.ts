import {readFileSync} from "fs";
import config from "$lib/config.json";
export default {
    lk_access_token: readFileSync("./secret/lk_access_token").toString(),
    lk_secret_key: readFileSync("./secret/lk_secret_key").toString(),
    ...config
}
import { writable } from "svelte/store";

export const server = writable<string>("amity.neg-zero.com");
export const isHttps = writable<boolean>(true)
export const port = writable<number>(3000)

export let token = writable<string | null>();
export const user = writable<{
    _id: string,
    id: {
        id: string,
        server: string
    },
    tag: string,
    name: string,
    description: string,
    avatar: string,
    banner: string,
    public_channels: object[],
    followers: string[],
    follows: string[],
    public_key: string,
    connections: {
        name: string,
        secret: string
    }[],
    chats: {
        _id: string,
        type: string,
        id: {
            id: string,
            server: string
        }
    }[],
    chat_folders: {
        _id: string,
        icon: string,
        name: string,
        elements: [{
            type: string,
            amity_id: {
                id: string,
                server: string
            }
        }]
    }[],
    password: string,
    cdn: string
}>();

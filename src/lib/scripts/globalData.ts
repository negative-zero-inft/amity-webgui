import { writable } from "svelte/store";

export const locale = writable<string>("en");

export const server = writable<string>("amity.neg-zero.com");
export const isHttps = writable<boolean>(true)
export const port = writable<number>(3000)

export const token = writable<string | null>();
export const accountIndex = writable<number>(0);
export const user = writable<{
    _id: string,
    id: {
        id: string,
        server: string
    },
    tag: string,
    name: string,
    description: string,
    avatar: string | null,
    banner: string | null,
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
        chat_type: string,
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
            chat_type: string,
            id: {
                id: string,
                server: string
            },
            _id: string
        }]
    }[],
    settings: {
        shiftSend: boolean,
    },
    password: string,
    cdn: string
}>();

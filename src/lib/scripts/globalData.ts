import { writable } from "svelte/store";

export let server = writable<string>("185.25.217.62");
export let user = writable<{
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
        id: {
            id: string,
            server: string
        }
    }[],
    chat_folders: {
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
export let token = writable<string | null>();
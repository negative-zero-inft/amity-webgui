import { writable } from "svelte/store";

export let server = writable<string>("localhost:3000");
export let userdata = writable<{
    amityID: {
        id: string,
        server: string
    },
    token: string
}>();
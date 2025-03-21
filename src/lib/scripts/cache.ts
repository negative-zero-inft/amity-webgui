import { writable } from "svelte/store";

export const chatEntries = writable<any[]>([]);
export const messages = writable<{
    id: {
        id: string,
        server: string
    },
    messages: any[]
}[]>([])
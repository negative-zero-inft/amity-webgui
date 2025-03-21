import { writable } from "svelte/store";

export const chatEntries = writable<any[]>([]);
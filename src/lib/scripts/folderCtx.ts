import { writable } from "svelte/store";

export const icon = writable('');
export const elements = writable<any[]>([]);
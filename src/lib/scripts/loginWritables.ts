import { writable } from "svelte/store";

export const isError = writable<boolean>(false);
export const errorValue = writable<string>("");
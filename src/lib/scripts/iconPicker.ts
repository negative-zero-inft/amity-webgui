import { writable } from "svelte/store";

export const isIconPicker = writable<boolean>(false);
export const icon = writable<string>("Cube");
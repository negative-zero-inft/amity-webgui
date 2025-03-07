import { writable } from "svelte/store";

export const isError = writable<boolean>(false);
export const errorValue = writable<string>("");
export const view = writable<"default" | "channelView" | "channelMaker" | "channelEditor" | "iconPicker">("default");
export const newGCE = writable<MouseEvent>();
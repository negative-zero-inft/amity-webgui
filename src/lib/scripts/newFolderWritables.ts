import { writable } from "svelte/store";

export const view = writable<"hidden" | "default" | "chatPicker" | "iconPicker">("hidden");
export const prevView = writable<"hidden" | "default" | "chatPicker" | "iconPicker">("hidden");

export const icon = writable<string>("Cube");
export const chats = writable<any[]>([]);

export const newFolderE = writable<MouseEvent>();
import { writable } from "svelte/store";

export const isFolderCtxMenu = writable<boolean>(false)
export const folderClickEvent = writable<MouseEvent>();

export const isUserBar = writable<boolean>(false);
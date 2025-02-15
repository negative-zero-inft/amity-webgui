import { writable } from "svelte/store";

export const isEmojiBar = writable<boolean>(false);
export const isGifBar = writable<boolean>(false);
export const isCommandBar = writable<boolean>(false);
export const isPollBar = writable<boolean>(false);
export const isMapBar = writable<boolean>(false);
export const isContactsBar = writable<boolean>(false);
export const isCloudStorageBar = writable<boolean>(false);
export const isStickerBar = writable<boolean>(false);
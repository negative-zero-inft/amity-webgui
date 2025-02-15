import { writable } from "svelte/store";

export const isEmojiBar = writable<boolean>(false);
export const isGifBar = writable<boolean>(false);
export const isCommandBar = writable<boolean>(false);
export const isPollBar = writable<boolean>(false);
export const isMapBar = writable<boolean>(false);
export const isContactsBar = writable<boolean>(false);
export const isCloudStorageBar = writable<boolean>(false);
export const isStickerBar = writable<boolean>(false);
export const isChatInfo = writable<boolean>(false);

export const states = [
    {id: "emoji", active: isEmojiBar},
    {id: "contacts", active: isContactsBar},
    {id: "gifs", active: isGifBar},
    {id: "maps", active: isMapBar},
    {id: "polls", active: isPollBar},
    {id: "stickers", active: isStickerBar},
    {id: "commands", active: isCommandBar},
    {id: "info", active: isChatInfo}
]

export function setActive(id: string) {
    states.forEach(item => {
        if (item.id === id) {
            item.active.update(v => !v);
            console.log(`set ${item.id} active`)
        } else {
            item.active.set(false);
        }
    });
}
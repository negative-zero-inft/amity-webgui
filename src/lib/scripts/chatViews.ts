import { writable } from "svelte/store";

export const windowClickEvent = writable<MouseEvent>();
export const isFolderCtxMenu = writable<boolean>(false)
export const folderClickEvent = writable<MouseEvent>();
export const folder = writable({
    name: "",
    icon: "",
    _id: "",
    elements: [],
    index: 0
})
export const currentFolder = writable<{
    name: string,
    icon: string,
    _id: string,
    elements: string[],
    index: number   
}>({
    name: "All chats",
    icon: "Chat",
    _id: "AC",
    elements: [],
    index: 0
})
export const previousFolder = writable<{
    name: string,
    icon: string,
    _id: string,
    elements: string[],
    index: number   
}>({
    name: "",
    icon: "",
    _id: "AC",
    elements: [],
    index: 0
})
    

export const currentChat = writable<{
    type: "empty" | "dm" | "channel" | "group" | "monogroup" | "soapbox",
    id: {
        id: string,
        server: string
    }
}>({
    type: "empty",
    id: {
        id: "",
        server: ""
    }
});

export const isMoreButtonCtxMenu = writable<boolean>(false);
export const moreButtonClickEvent = writable<MouseEvent>();

export const isEmojiBar = writable<boolean>(false);
export const isGifBar = writable<boolean>(false);
export const isCommandBar = writable<boolean>(false);
export const isPollBar = writable<boolean>(false);
export const isMapBar = writable<boolean>(false);
export const isContactsBar = writable<boolean>(false);
export const isCloudStorageBar = writable<boolean>(false);
export const isStickerBar = writable<boolean>(false);
export const isChatInfo = writable<boolean>(false);

export const isRecording = writable<boolean>(false);

export const isNewFolder = writable<boolean>(false);
export const newFolderE = writable<MouseEvent>();

export const isSettings = writable<boolean>(false);
export const isUserBar = writable<boolean>(false);

export const states = [
    { id: "emoji", active: isEmojiBar },
    { id: "contacts", active: isContactsBar },
    { id: "gifs", active: isGifBar },
    { id: "maps", active: isMapBar },
    { id: "polls", active: isPollBar },
    { id: "stickers", active: isStickerBar },
    { id: "commands", active: isCommandBar },
    { id: "info", active: isChatInfo },
    { id: "cloud", active: isCloudStorageBar }
]

export function setActive(id: string) {
    states.forEach(item => {
        if (item.id === id) {
            item.active.update(v => !v);
        } else {
            item.active.set(false);
        }
    });
}   
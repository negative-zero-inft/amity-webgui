import { writable } from "svelte/store";

export interface folderType{
    name: string,
    icon: string,
    _id: string,
    elements: string[],
    index: number   
}

export const windowClickEvent = writable<MouseEvent>();
export const folderClickEvent = writable<MouseEvent>();

export const isFolderCtxMenu = writable<boolean>(false)
export const folderCtxMenuView = writable<"hidden" | "default" | "edit" | "icon">("hidden")
export const prevFolderCtxMenuView = writable<"hidden" | "default" | "edit" | "icon">("hidden")

export const ctxFolder = writable<folderType>({
    name: "",
    icon: "",
    _id: "",
    elements: [],
    index: 0
})

export const currentFolder = writable<folderType>({
    name: "All chats",
    icon: "Chat",
    _id: "AC",
    elements: [],
    index: 0
})

export const previousFolder = writable<folderType>({
    name: "",
    icon: "",
    _id: "AC",
    elements: [],
    index: 0
})
    

export const currentChat = writable<{
    type: "empty" | "dm" | "channel" | "monogroup" | "soapbox",
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

export const isUserBar = writable<boolean>(false)
import { writable } from "svelte/store";

export interface folderType{
    name: string,
    icon: string,
    _id: string,
    elements: string[],
    index: number   
}

export const isNewGroup = writable<boolean>(false);
export const isNewChannel = writable<boolean>(false);

export const windowClickEvent = writable<MouseEvent>();
export const folderClickEvent = writable<MouseEvent>();
export const isReLogin = writable<boolean>(false);

export const isFolderCtxMenu = writable<boolean>(false)
export const folderCtxMenuView = writable<"hidden" | "default" | "edit" | "iconPicker" | "chatPicker">("hidden")
export const prevFolderCtxMenuView = writable<"hidden" | "default" | "edit" | "iconPicker" | "chatPicker">("hidden")

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
    },
    icon: string,
    name: string,
    memberList: string[],
}>({
    type: "empty",
    icon: "",
    name: "",
    id: {
        id: "",
        server: ""
    },
    memberList: []
});

export const isUserBar = writable<boolean>(false)
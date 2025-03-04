import { writable } from "svelte/store";

export const isError = writable<boolean>(false);
export const errorValue = writable<string>("");
export const view = writable<"login" | "signup" | "accountList">("login");
export const isHttpsL = writable<boolean>(true);
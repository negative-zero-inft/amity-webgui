import { writable } from "svelte/store";

export let server = writable<string>("localhost:3000");
import { writable } from "svelte/store";

export const auth = writable({
    username: "",
    password: ""
})

export const loggedIn = writable(false)
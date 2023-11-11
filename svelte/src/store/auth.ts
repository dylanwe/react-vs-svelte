import { writable } from "svelte/store";
import { TOKEN_KEY } from "../constants/stored-token-key";

export const isAuth = writable(!!localStorage.getItem(TOKEN_KEY));

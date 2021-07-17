import {Writable, writable} from "svelte/store";

export interface Toast {
    title: string,
    content: string,
    status?: "" | "success" | "danger" | "warning"
}
export type ToastStore = Writable<Toast[]> & {
    add: (Toast, number) => void
}

function ToastStore(): ToastStore {
    const inner = writable<Toast[]>([]);
    const add = (t: Toast, timeout = 2000) => {
        inner.update(all => all = [...all, t]);
        setTimeout(()=>{
            inner.update(all => all = all.filter(_t => _t !== t))
        }, timeout);
    }

    return Object.assign(inner, { add }) as unknown as ToastStore;
}
export const toastStore = ToastStore()
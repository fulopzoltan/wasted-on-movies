import { LocalStorage } from '../types/Storage';

// LOCAL STORAGE HELPERS
const getStorage = (key: string, storage: typeof localStorage | typeof sessionStorage) => {
    const item = storage.getItem(key);
    if (item) {
        try {
            return JSON.parse(item);
        } catch (e) {
            return null;
        }
    }
    return null;
};

export const getLocalStorage = <T extends keyof LocalStorage>(key: T): LocalStorage[T] => {
    return getStorage(key, localStorage);
};

export const setLocalStorage = <T extends keyof LocalStorage>(key: T, value: LocalStorage[T]) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = <T extends keyof LocalStorage>(key: T) => {
    localStorage.removeItem(key);
};

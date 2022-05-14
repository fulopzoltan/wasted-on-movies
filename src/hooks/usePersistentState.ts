import { useState } from 'react';
import { LocalStorage } from '../types/Storage';
import { getLocalStorage, setLocalStorage } from '../utils/helpers';

export function usePersistentState<T extends keyof LocalStorage>(key: T, defaultValue?: any) {
    const initialValue = getLocalStorage(key);
    const [store, setStore] = useState<typeof initialValue>(initialValue || defaultValue);

    const set = (value: LocalStorage[T]) => {
        setLocalStorage(key, value);
        setStore(value);
    };

    return {
        store,
        set
    };
}

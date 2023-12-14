// @ts-nocheck
import { useEffect, useState } from 'react';
import { isBrowser } from './utils';

type Session = Record<string, string>;

/**
 * Hook that manages multiple sessionStorage keys.
 *
 * @param appKey appkey scope to manage
 * @param initialValue initial value to set, if value in sessionStorage is empty base on `Appkey.Scope`. eg HomePage.Hero: {}
 * @param raw boolean, if set to true, hook will not attempt to JSON serialize stored values.
 * @returns
 */
const useSessionStorage = <T = Session>(
    appKey: string,
    initialValue?: T,
    raw?: boolean
): [T, (k: string, value: T) => void] => {
    if (!isBrowser) {
        return [initialValue as T, () => {}];
    }

    // @ts-ignore
    const [state, setState] = useState<T>(() => {
        try {
            if (!appKey) return;
            if (!sessionStorage) return;

            // filter by app key
            const keys = Object.keys(sessionStorage).filter((k) =>
                k.includes(appKey)
            );

            // ensure to get the value base on app key and scope
            keys.map((key) => {
                const sessionStorageValue = sessionStorage.getItem(key);
                if (
                    typeof sessionStorageValue !== 'string' &&
                    typeof initialValue === 'object'
                ) {
                    if (initialValue.hasOwnProperty(key) && initialValue[key]) {
                        sessionStorage.setItem(
                            key,
                            raw
                                ? String(initialValue[key])
                                : JSON.stringify(initialValue[key])
                        );
                    }
                    return initialValue;
                } else {
                    return raw
                        ? sessionStorageValue
                        : JSON.parse(sessionStorageValue || 'null');
                }
            });
        } catch {
            // If user is in private mode or has storage restriction
            // sessionStorage can throw. JSON.parse and JSON.stringify
            // can throw, too.
            return initialValue;
        }
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        try {
            if (!appKey) return;
            for (const stateKey in state) {
                if (Object.prototype.hasOwnProperty.call(state, stateKey)) {
                    const stateValue = state[stateKey];
                    const serializedState = raw
                        ? String(stateValue)
                        : JSON.stringify(stateValue);
                    // set session value based app and scope eg: homepage.hero
                    sessionStorage.setItem(
                        `${appKey}.${stateKey}`,
                        serializedState
                    );
                }
            }
        } catch {
            // If user is in private mode or has storage restriction
            // sessionStorage can throw. Also JSON.stringify can throw.
        }
    });

    const _setState = (key: string, payload) => {
        setState((prev) => ({
            [key]: payload,
            ...prev,
        }));
    };

    return [state, _setState];
};

export default useSessionStorage;

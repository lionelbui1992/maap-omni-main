export const addToDataLayer = (app, data) => {
    // @ts-ignore
    if (!window.dataLayer) return;
    // @ts-ignore
    if (!isArray(window.dataLayer)) return;
    // @ts-ignore
    const index = window.dataLayer.findIndex(
        d => d.event === data.event && d?.app === app
    );
    if (index === -1) {
        // @ts-ignore
        (window.dataLayer = window.dataLayer || []).push(data);
    } else {
        // @ts-ignore
        window.dataLayer[index] = data;
    }
};

export const toEvent = object => {
    const event = {};
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            event[`$${key}`] = element;
        }
    }
    return event;
};

// return itself if it is boolean
export function isBoolean(o) {
    if (o && {}.toString.call(o) !== '[object Boolean]') {
        return false;
    }
    return o;
}

// return itself if it is function
export function isFunction(fn) {
    if (fn && {}.toString.call(fn) !== '[object Function]') {
        return false;
    }
    return fn;
}

export function isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
}

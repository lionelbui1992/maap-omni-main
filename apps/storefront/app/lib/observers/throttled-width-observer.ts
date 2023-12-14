function throttle(callback, delay) {
    let timer: string | number | NodeJS.Timeout | undefined;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => callback.apply(this, args), delay);
    };
}

export default function (element, callback, delay = 250) {
    let prevWidth = 0;
    const resizeObserver = new ResizeObserver(
        throttle((elements) => {
            for (let elem of elements) {
                const width = elem.borderBoxSize?.[0].inlineSize;
                if (typeof width === 'number' && width !== prevWidth) {
                    prevWidth = width;
                    callback(width);
                }
            }
        }, delay)
    );
    resizeObserver.observe(element);
    return resizeObserver;
}

export const promiseResult = (result: any, fallback: any) =>
    result.status === 'fulfilled' ? result.value : fallback;

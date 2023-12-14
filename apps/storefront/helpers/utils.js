export const addRandomKey = array => {
    return array.map(item => {
        return {
            randomKey: Math.ceil(Math.random() * 100000000),
            ...item,
        };
    });
};

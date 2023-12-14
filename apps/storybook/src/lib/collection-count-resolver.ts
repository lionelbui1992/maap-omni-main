function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const collectionCountResolver = (handle: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(randomIntFromInterval(1, 400));
        }, 2000);
    });
};

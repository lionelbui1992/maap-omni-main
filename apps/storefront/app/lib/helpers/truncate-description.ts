// Limit the sentence up until second full-stop.
export default (description: string) => {
    let secondFullStopIndex = description?.indexOf(
        '.',
        description?.indexOf('.') + 1
    );
    return description?.slice(0, secondFullStopIndex + 1);
};

export const formatGTMName = str => {
    if (!str) return '';
    return str.replace(/ /g, '_');
};

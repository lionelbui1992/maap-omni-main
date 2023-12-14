export default (string) =>
    string
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

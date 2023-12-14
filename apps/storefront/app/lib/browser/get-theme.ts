export default function getTheme() {
    let theme = 'light';
    if (
        typeof window === 'object' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        theme = 'dark';
    }
    return theme;
}

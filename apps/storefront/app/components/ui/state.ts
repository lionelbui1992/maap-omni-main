import { create } from 'zustand';

type NavTheme = 'light' | 'dark';

interface UIState {
    openUIKey: null | string;
    nav_theme: NavTheme;
    toggleUI: (key: string | null) => void;
    toggleNavTheme: () => void;
    setNavTheme: (theme: NavTheme) => void;
    isIntersecting: boolean;
    setIntersection: (intersecting: boolean) => void;
}

const useUI = create<UIState>((set) => ({
    openUIKey: null,
    nav_theme: 'light',
    toggleUI: (key) =>
        set((state) =>
            state.openUIKey === key ? { openUIKey: null } : { openUIKey: key }
        ),
    toggleNavTheme: () =>
        set((state) => ({
            nav_theme: state.nav_theme === 'light' ? 'dark' : 'light',
        })),
    setNavTheme: (theme) => set((state) => ({ nav_theme: theme })),
    isIntersecting: false,
    setIntersection: (intersecting) =>
        set(() => ({ isIntersecting: intersecting })),
}));

export default useUI;

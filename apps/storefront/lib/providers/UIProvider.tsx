// @ts-nocheck
import React, { useMemo, useState, FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import throttle from 'lodash.throttle';

export interface State {
    displaySidebar: boolean;
    peakSidebar: boolean;
    displayDropdown: boolean;
    displaySearchbar: boolean;
    displaySearchResults: boolean;
    searchTerm: string;
    displayModal: boolean;
    modalView: string;
    sidebarView: string;
    userAuthenticated: string;
    displayComingSoon: boolean;
    displayLocaleUI: boolean;
}

const initialState = {
    displaySidebar: false,
    peakSidebar: false,
    displayDropdown: false,
    displaySearchbar: false,
    displaySearchResults: false,
    searchTerm: '',
    displayModal: false,
    modalView: 'REGION_SWITCHER',
    sidebarView: 'CART_VIEW',
    userAuthenticated: false,
    displayComingSoon: false,
    displayLocaleUI: false,
};

type MODAL_VIEWS = 'REGION_SWITCHER' | 'SIZE_GUIDE';

type SIDEBAR_VIEWS =
    | 'CART_VIEW'
    | 'PROFILE_VIEW'
    | 'MENU_VIEW'
    | 'SUPPORT_VIEW';

let debounced = null;

export const UIContext = React.createContext<State | any>(initialState);

export const UIProvider: FC<{ children: React.ReactNode }> = (props) => {
    const router = useRouter();
    const [state, setState] = useState(initialState);

    useEffect(() => {
        router.events.on('routeChangeStart', () => setState(initialState));

        return () => {
            router.events.off('routeChangeStart', () => setState(initialState));
        };
    }, []);

    useEffect(() => {
        if (state.displaySidebar) {
            cancelDelayedSideBarClose();
        }
    }, [state]);

    const displayMenuUI = () => {
        setState({
            ...initialState,
            displaySidebar: true,
            sidebarView: 'MENU_VIEW',
        });
    };

    const toggleMenuUI = () => {
        setState({
            ...initialState,
            displaySidebar:
                state.sidebarView !== 'MENU_VIEW'
                    ? true
                    : !state.displaySidebar,
            sidebarView: 'MENU_VIEW',
        });
    };

    const displayCartUI = () => {
        setState({
            ...initialState,
            displaySidebar: true,
            sidebarView: 'CART_VIEW',
        });
    };

    const toggleCartUI = () => {
        setState({
            ...initialState,
            displaySidebar:
                state.sidebarView !== 'CART_VIEW'
                    ? true
                    : !state.displaySidebar,
            sidebarView: 'CART_VIEW',
        });
    };

    const displayProfileUI = () => {
        setState({
            ...initialState,
            displaySidebar: true,
            sidebarView: 'PROFILE_VIEW',
        });
    };

    const toggleProfileUI = () => {
        setState({
            ...initialState,
            displaySidebar:
                state.sidebarView !== 'PROFILE_VIEW'
                    ? true
                    : !state.displaySidebar,
            sidebarView: 'PROFILE_VIEW',
        });
    };

    const displaySupportUI = () => {
        setState({
            ...initialState,
            displaySidebar: true,
            sidebarView: 'SUPPORT_VIEW',
        });
    };

    const toggleSupportUI = () => {
        setState({
            ...initialState,
            displaySidebar:
                state.sidebarView !== 'SUPPORT_VIEW'
                    ? true
                    : !state.displaySidebar,
            sidebarView: 'SUPPORT_VIEW',
        });
    };

    const displaySearchUI = () => {
        setState({
            ...state,
            displaySidebar: false,
            displaySearchbar: true,
        });
    };

    const closeSearchUI = () => {
        setState({
            ...state,
            displaySearchbar: false,
        });
    };

    const toggleSearchUI = () => {
        setState({
            ...state,
            displaySidebar: false,
            displaySearchbar: !state.displaySearchbar,
        });
    };

    const toggleLocaleUI = () => {
        setState({
            ...state,
            displayLocaleUI: !state.displayLocaleUI,
        });
    };

    const closeLocaleUI = () => {
        setState({
            ...state,
            displayLocaleUI: false,
        });
    };

    const closeSidebar = () => {
        setState({
            ...state,
            displaySidebar: false,
        });
    };
    const closeSidebarWithDelay = () => {
        cancelDelayedSideBarClose();
        debounced = setTimeout(() => {
            setState({
                ...state,
                displaySidebar: false,
            });
        }, 500);
    };

    const cancelDelayedSideBarClose = () => {
        if (debounced) {
            clearTimeout(debounced);
            debounced = null;
        }
    };

    const toggleSidebar = () => {
        setState({
            ...state,
            displaySidebar: !state.displaySidebar,
        });
    };

    const setSidebarView = (view) => {
        setState({
            ...state,
            sidebarView: view,
        });
    };

    const setSearchTerm = throttle(
        (searchTerm) => {
            setState({
                ...state,
                searchTerm,
                displaySearchResults: searchTerm.length > 0,
            });
        },
        300,
        { trailing: false }
    );

    const value = useMemo(
        () => ({
            ...state,
            displayMenuUI,
            toggleMenuUI,
            displayCartUI,
            toggleCartUI,
            displayProfileUI,
            toggleProfileUI,
            displaySupportUI,
            toggleSupportUI,
            displaySearchUI,
            closeSearchUI,
            toggleSearchUI,
            closeSidebar,
            toggleSidebar,
            setSidebarView,
            toggleLocaleUI,
            closeLocaleUI,
            setSearchTerm,
            closeSidebarWithDelay,
            cancelDelayedSideBarClose,
        }),
        [state]
    );

    return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
    const context = React.useContext(UIContext);
    if (context === undefined) {
        throw new Error(`useUI must be used within a UIProvider`);
    }
    return context;
};

export const ManagedUIProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => <UIProvider>{children}</UIProvider>;

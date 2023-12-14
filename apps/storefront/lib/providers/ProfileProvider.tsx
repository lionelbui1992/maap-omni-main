// @ts-nocheck
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
    FC,
} from 'react';
import {
    getProfilePortalToken,
    setProfilePortalToken,
    signoutProfilePortal,
} from 'helpers/cookies';
import { useRouter } from 'next/router';
import { useUI } from './UIProvider';

export interface State {
    authenticated: string;
    portalUrl: string;
    token: string | null;
}

const initialState = {
    authenticated: false,
    portalUrl: 'https://my.maap.cc',
    token: null,
};

export const ProfileContext = React.createContext<State | any>(initialState);

ProfileContext.displayName = 'ProfileProvider';

export const ProfileProvider: FC<{
    regionCode: string;
    children: ReactNode;
}> = (props) => {
    const router = useRouter();
    const [state, setState] = useState(initialState);
    const { query } = router;
    const { regionCode } = props;
    const { displayProfileUI } = useUI();

    let omneoCompatibleRegionCode = regionCode?.toLowerCase();
    if (omneoCompatibleRegionCode === 'us') omneoCompatibleRegionCode = 'usa'; // Codes dont match.

    const handleLoginEvent = () => {
        setState({
            ...state,
            authenticated: true,
        });
    };

    const handleLogoutEvent = () => {
        setState({
            ...state,
            token: null,
            authenticated: false,
        });

        signoutProfilePortal();

        router.replace(router.pathname, undefined, { shallow: true });
    };

    const handleProfilePortalMessage = useCallback((event) => {
        if (event.data === 'login') {
            handleLoginEvent();
        }

        if (event.data === 'logout') {
            handleLogoutEvent();
        }
    }, []);

    useEffect(() => {
        setState({
            ...state,
            portalUrl: `${initialState.portalUrl}?region=${omneoCompatibleRegionCode}`,
        });
    }, [regionCode]);

    useEffect(() => {
        const token = getProfilePortalToken(null);
        if (token) {
            setState({
                ...state,
                token,
                authenticated: true,
                portalUrl: `${initialState.portalUrl}/login?token=${token}&region=${omneoCompatibleRegionCode}`,
            });
        }
    }, []);

    useEffect(() => {
        window.addEventListener('message', handleProfilePortalMessage);

        return () => {
            window.removeEventListener('message', handleProfilePortalMessage);
        };
    }, [handleProfilePortalMessage]);

    useEffect(() => {
        const { token, redirect } = query;

        if (token && token.length) {
            setState({
                ...state,
                token,
                portalUrl: `${state.portalUrl}/login?token=${token}&redirect=${redirect}&region=${omneoCompatibleRegionCode}`,
            });

            setProfilePortalToken(token);
            displayProfileUI();
        }
    }, [query]);

    const value = useMemo(
        () => ({
            ...state,
        }),
        [state]
    );

    return <ProfileContext.Provider value={value} {...props} />;
};

export const useProfile = () => {
    const context = React.useContext(ProfileContext);
    if (context === undefined) {
        throw new Error(`useProfile must be used within a ProfileProvider`);
    }
    return context;
};

export const ManagedProfileProvider: FC<{
    children: React.ReactNode;
    regionCode: string;
}> = ({ children, regionCode }) => (
    <ProfileProvider regionCode={regionCode}>{children}</ProfileProvider>
);

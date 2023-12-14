import React from 'react';
import { useRouter } from 'next/router';

const ProfilePortal = () => {
    const router = useRouter();
    let profilePortalUrl = 'https://maap.profileaction.io';
    if (router) {
        const { query } = router;

        const { token, redirect } = query;

        if (token) {
            profilePortalUrl += `/login?token=${token}&redirect=${redirect}`;
        }
    }

    return (
        <>
            <iframe
                src={profilePortalUrl}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0,
                    border: 0,
                }}
            />
        </>
    );
};

export default ProfilePortal;

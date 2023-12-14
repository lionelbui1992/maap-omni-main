import Cookies from 'js-cookie';
import nextCookies from 'next-cookies';

export const getCheckoutId = (ctx, countryCode) => {
    if (countryCode?.toUpperCase() === 'EU') {
        if (ctx && ctx.req) {
            const { checkoutIdEU } = nextCookies(ctx);
            return checkoutIdEU;
        }

        return Cookies.get('checkoutIdEU');
    }

    if (countryCode?.toUpperCase() === 'US' || countryCode === 'CA') {
        if (ctx && ctx.req) {
            const { checkoutIdUS } = nextCookies(ctx);
            return checkoutIdUS;
        }
        return Cookies.get('checkoutIdUS');
    }

    if (countryCode?.toUpperCase() === 'UK') {
        if (ctx && ctx.req) {
            const { checkoutIdUK } = nextCookies(ctx);
            return checkoutIdUK;
        }
        return Cookies.get('checkoutIdUK');
    }

    if (countryCode?.toUpperCase() === 'INTL') {
        if (ctx && ctx.req) {
            const { checkoutIdINTL } = nextCookies(ctx);
            return checkoutIdINTL;
        }
        return Cookies.get('checkoutIdINTL');
    }

    return null;
};

export const setCheckoutId = (checkoutId, countryCode) => {
    if (countryCode.toUpperCase() === 'EU') {
        Cookies.set('checkoutIdEU', checkoutId, {
            expires: 1,
        });
    } else if (countryCode.toUpperCase() === 'US') {
        Cookies.set('checkoutIdUS', checkoutId, {
            expires: 1,
        });
    } else if (countryCode.toUpperCase() === 'UK') {
        Cookies.set('checkoutIdUK', checkoutId, {
            expires: 1,
        });
    } else {
        Cookies.set('checkoutIdINTL', checkoutId, {
            expires: 1,
        });
    }
};

export const removeCheckoutId = countryCode => {
    if (typeof countryCode === 'undefined') return;
    if (countryCode.toUpperCase() === 'EU') {
        Cookies.remove('checkoutIdEU');
    } else if (countryCode.toUpperCase() === 'US') {
        Cookies.remove('checkoutIdUS');
    } else if (countryCode.toUpperCase() === 'UK') {
        Cookies.remove('checkoutIdUK');
    } else {
        Cookies.remove('checkoutIdINTL');
    }
};

export const getProfilePortalToken = ctx => {
    if (ctx && ctx.req) {
        const { profilePortalToken } = nextCookies(ctx);

        return profilePortalToken;
    }

    return Cookies.get('profilePortalToken');
};

export const setProfilePortalToken = token => {
    Cookies.set('profilePortalToken', token, {
        expires: 7,
    });
};

export const signoutProfilePortal = () => {
    Cookies.remove('profilePortalToken');
};

export const signOut = (countryCode = 'INTL') => {
    if (countryCode.toUpperCase() === 'EU') {
        Cookies.remove('customerTokenEU');
    } else if (countryCode.toUpperCase() === 'US') {
        Cookies.remove('customerTokenUS');
    } else if (countryCode.toUpperCase() === 'UK') {
        Cookies.remove('customerTokenUK');
    } else {
        Cookies.remove('customerTokenINTL');
    }
};

export const getCurrentRegionCode = ctx => {
    if (ctx && ctx.req) {
        const { currentRegionCode } = nextCookies(ctx);
        return currentRegionCode;
    }
    return Cookies.get('currentRegionCode');
};

export const setRegionPromptHidden = hidden => {
    Cookies.set('regionPromptHidden', hidden, {
        expires: 365,
    });
};

export const getRegionPromptHidden = ctx => {
    if (ctx && ctx.req) {
        const { regionPromptHidden } = nextCookies(ctx);
        return regionPromptHidden;
    }

    return Cookies.get('regionPromptHidden');
};

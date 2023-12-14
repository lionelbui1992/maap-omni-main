import Cookies from 'js-cookie';

export function setDisplayRegion(baseRegion: string, displayRegion: string) {
    Cookies.set(
        'regionDisplayOverride',
        JSON.stringify({ baseRegion, displayRegion }),
        {
            expires: 7,
        }
    );

    return displayRegion;
}

export function getDisplayRegion(baseRegion: string) {
    try {
        const cookieString = Cookies.get('regionDisplayOverride');

        if (cookieString) {
            const cookieValue = JSON.parse(cookieString);

            if (!cookieValue || !cookieValue?.displayRegion) return null;

            if (cookieValue.baseRegion !== baseRegion) return null;

            return cookieValue?.displayRegion;
        }
    } catch (e) {}

    return false;
}

export function removeDisplayRegion() {
    Cookies.remove('regionDisplayOverride');
}

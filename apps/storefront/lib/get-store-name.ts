export function getStoreNameFromCountryCode(countryCode: string) {
    if (!countryCode) return 'maapapparel';

    switch (countryCode.toLowerCase()) {
        case 'usa':
        case 'us':
            return 'maap-usa';
        case 'eu':
            return 'maap-eu';
        case 'uk':
            return 'maap-uk';
        default:
        case 'intl':
            return 'maapapparel';
    }
}

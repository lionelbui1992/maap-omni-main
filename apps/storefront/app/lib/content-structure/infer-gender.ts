import { ContentStructureGender } from './content-structure.d';

const WOMAN_IDENTIFIERS: string[] = ['woman', 'womens'];

// TODO - This should be moved to content structure augmentation which will fetch the collections and add their gender & product count from meta.
const UNISEX_IDENTIFIERS: string[] = [
    'accessories',
    'uv-leg-screens',
    'uv-arm-screens',
    'cycling-training-towels',
    'cycling-caps',
    'cycling-training-towels',
    'cycling-sunglasses',
    'cycling-bottles',
    'cycling-neck-warmers',
    'cycling-arm-warmers',
    'cycling-knee-warmers',
    'cycling-leg-warmers',
    'cycling-overshoes',
    'cycling-oversocks',
    'cycling-headbands',
    'cycling-frame-bags',
    'cycling-musette-bags',
    'beanies',
    'key-chains',
    'socks',
];

export function inferGenderFromHandle(handle: string): ContentStructureGender {
    for (const identifier of WOMAN_IDENTIFIERS) {
        if (handle.includes(identifier)) {
            return ContentStructureGender.WOMAN;
        }
    }
    for (const identifier of UNISEX_IDENTIFIERS) {
        if (handle.includes(identifier)) {
            return ContentStructureGender.UNISEX;
        }
    }
    return ContentStructureGender.MAN;
}

export function inferGenderFromUrl(url: string): ContentStructureGender {
    const slug = url.split('/').pop();
    if (!slug) return ContentStructureGender.MAN;
    return inferGenderFromHandle(slug);
}

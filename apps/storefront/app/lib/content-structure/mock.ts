import { ContentStructure } from './content-structure';
import { ContentStructureGender } from './content-structure.d';

const CommonTierTwoLinks: ContentStructure = [
    {
        label: 'All',
        gender: ContentStructureGender.MAN,
        hrefLink: '/collections/all',
    },
    {
        label: 'Features',
        gender: ContentStructureGender.MAN,
        children: [
            {
                label: 'New Arrivals',
                hrefLink: '/collections/new-arrivals',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Alt_Road',
                hrefLink: '/collections/alt-road-collection',
                gender: ContentStructureGender.MAN,
            },
        ],
    },
    {
        label: 'On Bike',
        gender: ContentStructureGender.MAN,
        children: [
            {
                label: 'Jerseys',
                hrefLink: '/collections/jerseys',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Base Layers',
                hrefLink: '/collections/base-layers',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Bib Shorts',
                hrefLink: '/collections/bib-shorts',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Bib Tights',
                hrefLink: '/collections/bib-tights',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Jackets',
                hrefLink: '/collections/jackets',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Vests',
                hrefLink: '/collections/vests',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Shorts',
                hrefLink: '/collections/shorts',
                gender: ContentStructureGender.MAN,
            },
            // {
            //   label: "Socks",
            //   hrefLink: "/collections/socks",
            //   gender: ContentStructureGender.MAN,
            // },
        ],
    },
    {
        label: 'Off Bike',
        gender: ContentStructureGender.MAN,
        children: [
            {
                label: 'T Shirts',
                hrefLink: '/collections/transit-t-shirts',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Pants',
                hrefLink: '/collections/transit-pants',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Caps',
                hrefLink: '/collections/caps',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Beanies',
                hrefLink: '/collections/beanies',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'Sweats',
                hrefLink: '/collections/Sweats',
                gender: ContentStructureGender.MAN,
            },
        ],
    },
    {
        label: 'Collections',
        gender: ContentStructureGender.MAN,
        children: [
            {
                label: 'Transit',
                hrefLink: '/collections/transit-woman',
                gender: ContentStructureGender.MAN,
            },
            // {
            //   label: "Alt_Road",
            //   hrefLink: "/collections/alt-road",
            //   gender: ContentStructureGender.MAN,
            // },
            {
                label: 'Training',
                hrefLink: '/collections/training',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'OffCuts',
                hrefLink: '/collections/offcuts',
                gender: ContentStructureGender.MAN,
            },
        ],
    },
    {
        label: 'Collaborations',
        gender: ContentStructureGender.MAN,
        children: [
            {
                label: 'MAAP x 100%',
                hrefLink: '/collections/cycling-sunglasses',
                gender: ContentStructureGender.MAN,
            },
            {
                label: 'MAAP x Apidura',
                hrefLink: '/collections/cycling-sunglasses',
                gender: ContentStructureGender.MAN,
            },
        ],
    },
];

const ContentStructureMock: ContentStructure = [
    {
        hrefLink: '/collections/on-bike-man',
        label: 'Man',
        gender: ContentStructureGender.MAN,
        children: CommonTierTwoLinks,
    },
    {
        hrefLink: '/collections/on-bike-woman',
        label: 'Woman',
        gender: ContentStructureGender.WOMAN,
        // children: CommonTierTwoLinks,
    },
    {
        hrefLink: '/collections/cycling-accessories',
        label: 'Accessories',
        gender: ContentStructureGender.UNISEX,
        children: [
            {
                label: 'Socks',
                hrefLink: '/collections/socks',
                gender: ContentStructureGender.UNISEX,
            },
            {
                label: 'UV Screens',
                hrefLink: '/collections/uv-screens',
                gender: ContentStructureGender.UNISEX,
            },
            {
                label: 'Sunglasses',
                hrefLink: '/collections/sun-glasses',
                gender: ContentStructureGender.UNISEX,
            },
        ],
    },
    {
        hrefLink: '/stories',
        label: 'Stories',
        gender: ContentStructureGender.UNISEX,
    },
];

export default ContentStructureMock;

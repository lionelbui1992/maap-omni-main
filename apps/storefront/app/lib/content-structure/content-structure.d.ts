export type ContentStructureIcon =
    | 'globe'
    | 'discover'
    | 'northeast'
    | 'right'
    | 'left'
    | 'down'
    | 'circle';

export enum ContentStructureGender {
    MAN = 'man',
    WOMAN = 'woman',
    UNISEX = 'unisex',
}

export type ContentStructureNavItem = {
    identifier?: string;
    label: string;
    hrefLink?: string;
    icon?: ContentStructureIcon;
    gender?: ContentStructureGender;
    children?: ContentStructureNavItem[];
    count?: number;
};

export type ContentStructure = ContentStructureNavItem[];

export type UseContentStructureProvides = {
    getNavFromNode: (
        node: ContentStructureNavItem | null
    ) => ContentStructure | null;
    getPathsForNode: (
        node: ContentStructureNavItem
    ) => ContentStructureNavItem[];
    getBranchLengthForNode: (node: ContentStructureNavItem) => number;
    assertLoseNodeMatch: (
        node: ContentStructureNavItem,
        comparisonNode: ContentStructureNavItem
    ) => boolean;
    structure: ContentStructure;
};

export type UseContentStructure = (
    structure: ContentStructure
) => UseContentStructureProvides;

export type ShopifyMenuItem = {
    tags: string[];
    type: string;
    url: string;
    title: string;
    items?: ShopifyMenuItem[];
};

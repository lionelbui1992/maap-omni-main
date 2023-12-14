import {
    ContentStructure,
    ContentStructureNavItem,
} from '@lib/content-structure/types';

export type WayfinderVariant = 'default' | 'pill';

export type WayfinderProps = {
    contentStructure: ContentStructure;
    activeItem: ContentStructureNavItem;
    totalProductCount?: number;
    variant?: WayfinderVariant;
};

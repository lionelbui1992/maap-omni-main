import { ContentStructureNavItem } from "../../lib/content-structure/types";

export type HeaderNavVariant = "mobile" | "desktop" | "responsive";

export type HeaderNavCallbacks = {
  toggleMenu: () => void;
  toggleSearch: () => void;
  toggleItem: (item: ContentStructureNavItem) => void;
  toggleCountrySelector?: () => void;
  toggleSupport?: () => void;
  toggleCart?: () => void;
  toggleProfile?: () => void;
};

export type HeaderNavProps = {
  variant: HeaderNavVariant;
  items: ContentStructureNavItem[];
  activeItem?: ContentStructureNavItem;
  callbacks: HeaderNavCallbacks;
};

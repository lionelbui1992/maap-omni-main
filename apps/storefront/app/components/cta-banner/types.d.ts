import { IconName } from "mmds";

export type CTABannerProps = {
  block: CTABannerBlock;
};

export type CTABannerVariant = "single" | "split";
export type TitleSizeVariant = "small" | "medium" | "large";

export interface CTABannerBlock {
  variant: CTABannerVariant;
  items: CTABannerItem[];
}

export interface CTABannerItem {
  title: string;
  titleSize?: TitleSizeVariant;
  desktopImage: string;
  mobileImage: string;
  link?: string;
  icon?: IconName;
}

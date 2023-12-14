import { NavIconName } from '../tokens/icons/types';
import { ButtonRadiusSize, ButtonVariant } from '../components/button';

export type CTAVariant = ButtonVariant;
export type CTARadiusSize = ButtonRadiusSize;
export type CTAIcon = NavIconName;

export type CTAItem = {
    variant: ButtonVariant;
    label: string;
    link?: string;
    icon?: NavIconName;
    radiusSize?: CTARadiusSize;
    onClick?: () => void;
    disabled?: boolean;
};

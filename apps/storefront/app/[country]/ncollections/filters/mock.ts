import { ButtonVariant } from 'mmds';
import { Option } from './types';

export const sizeOptions: Option[] = [
    { label: 'XXS', value: 'xxs' },
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
];

export const colorOptions: Option[] = [
    { label: 'Black', value: 'black' },
    { label: 'Deep Blue', value: 'deep-blue' },
    { label: 'Mars', value: 'mars' },
];

export const fitOptions: Option[] = [
    { label: 'Pro', value: 'pro' },
    { label: 'Team', value: 'team' },
];

export const weatherOptions: Option[] = [
    { label: 'Cold', value: 'cold' },
    { label: 'Hot', value: 'hot' },
    { label: 'Rain', value: 'rain' },
    { label: 'Wind', value: 'wind' },
];

export const counter = Math.floor(Math.random() * 315);

export const CTAItems = [
    {
        label: 'Clear All',
        variant: 'ghost' as ButtonVariant,
    },
    {
        label: 'Apply',
        variant: 'base' as ButtonVariant,
    },
];

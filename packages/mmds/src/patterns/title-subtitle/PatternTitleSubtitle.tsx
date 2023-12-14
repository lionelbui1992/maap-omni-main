import React from 'react';
import s from './PatternTitleSubtitle.module.css';
import cn from 'clsx';
import { Icon } from '../../tokens/icons';
import { IconName } from '../../tokens/icons/types';

interface PatternTitleSubtitleProps {
    title: string;
    titleSize?: 'small' | 'medium' | 'large';
    subTitle?: string;
    subTitleSize?: 'small' | 'medium' | 'large';
    titleIcon?: IconName;
}

export const PatternTitleSubtitle = ({
    title,
    subTitle,
    titleIcon = '',
    titleSize = 'large',
    subTitleSize = 'large',
}: PatternTitleSubtitleProps) => {
    const titleClassName = cn(s.titleSizeRoot, {
        [s.titleSizeSmall]: titleSize === 'small',
        [s.titleSizeMedium]: titleSize === 'medium',
        [s.titleSizeLarge]: titleSize === 'large',
    });
    const subTitleClassName = cn(s.subTitleSizeRoot, {
        [s.subTitleSizeSmall]: subTitleSize === 'small',
        [s.subTitleSizeMedium]: subTitleSize === 'medium',
        [s.subTitleSizeLarge]: subTitleSize === 'large',
    });

    return (
        <div>
            {title && (
                <h1 className={titleClassName}>
                    {title}
                    {titleIcon && <Icon className={s.icon} icon={titleIcon} />}
                </h1>
            )}
            {subTitle && <h2 className={subTitleClassName}>{subTitle}</h2>}
        </div>
    );
};

export default PatternTitleSubtitle;

import React from 'react';
import cn from 'clsx';
import { CTASet, PatternCTASet } from '../cta-set/PatternCTASet';
import s from './PatternPosterData.module.css';

interface PatternPosterData {
    productTitle?: string;
    context?: string;
    content?: string;
    ctaSet?: CTASet;
    variant: 'feature' | 'featureVideoStack' | 'features';
    titlePosition?: 'top' | 'bottom';
    title?: string;
}

export const PatternPosterData = ({
    productTitle,
    content,
    ctaSet,
    variant,
    context,
    title,
    titlePosition,
}: PatternPosterData) => {
    const posterDataClassName = cn({
        [s.feature]: variant === 'feature',
        [s.featureStack]: variant === 'featureVideoStack',
        [s.features]: variant === 'features',
    });

    return (
        <div className={posterDataClassName}>
            <div>
                {context && (
                    <div className={cn('mmds-component-one-detail')}>
                        {context}
                    </div>
                )}
                {title && titlePosition === 'top' && (
                    <div className={cn(s.title, s.titleTop)}>{title}</div>
                )}
                {productTitle && (
                    <div className={cn('mmds-component-one-detail')}>
                        {productTitle}
                    </div>
                )}
            </div>
            <div>
                {title && titlePosition === 'bottom' && (
                    <div className={cn(s.title, s.titleBottom)}>{title}</div>
                )}
                {content && <div className={s.content}>{content}</div>}
                {ctaSet && (
                    <div className={s.button}>
                        <PatternCTASet set={ctaSet} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatternPosterData;

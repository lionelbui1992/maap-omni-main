import React from 'react';
import { LinkManager, PatternTitleSubtitle, slugify, StaticImage } from 'mmds';
import { CTABannerProps } from './types';
import s from './CTABanner.module.css';

const CTABannerSingleVariant = ({ block }: CTABannerProps) => {
    const { items } = block;
    const { desktopImage, mobileImage, title, titleSize, link, icon } =
        items[0];

    return (
        <div
            className={s.container}
            key={`ctab_single_${slugify(title)}`}
            data-testid={`ctab_single_${slugify(title)}`}
            data-link={link}
        >
            <LinkManager
                href={link}
                title={`Go to page ${title}`}
                applyLink={!!link}
            >
                <div className={s.splitColumnContainer}>
                    <StaticImage
                        desktopImage={desktopImage}
                        mobileImage={mobileImage}
                        altDescription={title}
                        fullWidth={true}
                    />
                    {title && (
                        <div className={`${s.overlayContent} ${s.center}`}>
                            <div className={s.content}>
                                <PatternTitleSubtitle
                                    title={title}
                                    titleSize={titleSize}
                                    titleIcon={icon}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </LinkManager>
        </div>
    );
};

export default CTABannerSingleVariant;

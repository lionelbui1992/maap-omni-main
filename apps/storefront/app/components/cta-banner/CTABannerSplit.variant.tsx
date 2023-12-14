import { LinkManager, PatternTitleSubtitle, slugify, StaticImage } from 'mmds';
import { CTABannerProps } from './types';
import cn from 'clsx';
import s from './CTABanner.module.css';

const CTABannerSplitVariant = ({ block }: CTABannerProps) => {
    const { items } = block;
    const rootClass = cn(s.container, s.split);
    if (items.length !== 2) {
        throw new Error('CTABanner_SplitVariant requires exactly 2 items');
    }

    return (
        <div className={rootClass} data-testid={`cta_banner_split`}>
            {items.map((item, index) => {
                const {
                    desktopImage,
                    mobileImage,
                    title,
                    titleSize,
                    icon,
                    link,
                } = item;
                return (
                    <div
                        className={s.splitColumnContainer}
                        key={`cta_banner_item_${slugify(title)}_${index}`}
                        data-testid={`cta_banner_split_${slugify(
                            title
                        )}_${index}`}
                    >
                        <LinkManager
                            href={link}
                            title={`Go to page ${title}`}
                            applyLink={!!link}
                        >
                            <StaticImage
                                desktopImage={desktopImage}
                                mobileImage={mobileImage}
                                altDescription={title}
                                fullWidth={true}
                            />
                            {title && (
                                <div
                                    className={`${s.overlayContent} ${s.center}`}
                                >
                                    <div className={s.content}>
                                        <PatternTitleSubtitle
                                            title={title}
                                            titleSize={titleSize}
                                            titleIcon={icon}
                                        />
                                    </div>
                                </div>
                            )}
                        </LinkManager>
                    </div>
                );
            })}
        </div>
    );
};

export default CTABannerSplitVariant;

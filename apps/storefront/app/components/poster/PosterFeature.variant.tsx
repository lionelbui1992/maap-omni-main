import { PosterItem, PosterProps } from './types';
import { PatternPosterData, StaticImage } from 'mmds';
import s from './Poster.module.css';
import cn from 'clsx';

const PosterFeatureVariant = ({ block }: PosterProps) => {
    const { items } = block;

    return (
        <>
            {items.map((item: PosterItem, index: number) => {
                const posterFeatureRoot = cn(s.posterFeatureRoot, {
                    [s.textLightThemeDesktop]: !item.textThemeDesktop,
                    [s.textLightThemeMobile]: !item.textThemeMobile,
                });

                return (
                    <div className={posterFeatureRoot} key={index}>
                        <div
                            className={s.posterFeatureBG}
                            style={{
                                backgroundColor:
                                    item.backgroundColor || '#E7E7E7',
                            }}
                        >
                            <PatternPosterData
                                productTitle={item.productTitle}
                                content={item.content}
                                ctaSet={item.CTASet}
                                variant="feature"
                            />
                        </div>
                        <div className={s.posterFeatureImage}>
                            <StaticImage
                                desktopImage={item.desktopImage}
                                mobileImage={item.mobileImage}
                                altDescription={item.productTitle}
                                fullWidth={true}
                            />
                            <div className={s.posterFeatureContent}>
                                <PatternPosterData
                                    productTitle={item.productTitle}
                                    content={item.content}
                                    ctaSet={item.CTASet}
                                    variant="feature"
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default PosterFeatureVariant;

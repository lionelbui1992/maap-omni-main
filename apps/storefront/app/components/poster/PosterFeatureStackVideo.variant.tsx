import { PosterItem, PosterProps } from './types';
import s from './PosterFeatureStackVideo.module.css';
import { PatternPosterData, StaticImage, Video } from 'mmds';
import cn from 'clsx';

const PosterFeatureStackVideoVariant = ({ block }: PosterProps) => {
    const { items } = block;

    return (
        <>
            {items.map((item: PosterItem, index: number) => {
                const posterFeatureStackVideoRoot = cn({
                    [s.textDarkThemeDesktop]: item.textThemeDesktop,
                    [s.textLightThemeDesktop]: !item.textThemeDesktop,
                    [s.textDarkThemeMobile]: item.textThemeMobile,
                    [s.textLightThemeMobile]: !item.textThemeMobile,
                });
                return (
                    <div
                        className={posterFeatureStackVideoRoot}
                        key={`poster_item_${index}`}
                    >
                        <div className={s.video}>
                            <Video
                                desktopVideoUrl={item.desktopVideoURL}
                                mobileVideoUrl={item.mobileVideoURL}
                                controls={false}
                                muted={true}
                                loop={true}
                                autoplay={true}
                            />
                            <div className={s.productTitle}>
                                {item.productTitle}
                            </div>
                        </div>
                        <div
                            className={s.stackContent}
                            style={{
                                backgroundColor:
                                    item.backgroundColor || '#E7E7E7',
                            }}
                        >
                            <div className={s.content}>
                                <PatternPosterData
                                    variant="featureVideoStack"
                                    content={item.content}
                                    ctaSet={item.CTASet}
                                />
                            </div>
                            <div className={s.variantContent}>
                                <StaticImage
                                    desktopImage={item.variantImage}
                                    altDescription={item.variantTitle}
                                    desktopWidth={'280'}
                                    desktopHeight={'373.33'}
                                />
                                <div className={s.variantTitle}>
                                    {item.variantTitle}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default PosterFeatureStackVideoVariant;

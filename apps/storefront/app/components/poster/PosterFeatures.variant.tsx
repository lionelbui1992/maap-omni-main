import { PosterProps } from '@app/components/poster/types';
import { PatternCTASet, PatternPosterData, StaticImage } from 'mmds';
import s from './Poster.module.css';
import cn from 'clsx';

const PosterFeaturesVariant = ({ block }: PosterProps) => {
    const { items } = block;

    return (
        <>
            {items.map((item) => {
                const {
                    desktopImageRight,
                    mobileImageRight,
                    desktopImageLeft,
                    mobileImageLeft,
                    backgroundColorRight,
                    backgroundColorLeft,
                    CTASet,
                    titlePosition,
                    content,
                    context,
                    title,
                } = item;
                const posterFeaturesRoot = cn(s.posterFeaturesRoot, {
                    [s.textDarkThemeDesktop]: item.textThemeDesktop,
                    [s.textLightThemeDesktop]: !item.textThemeDesktop,
                    [s.textDarkThemeMobile]: item.textThemeMobile,
                    [s.textLightThemeMobile]: !item.textThemeMobile,
                });

                return (
                    <div className={posterFeaturesRoot} key={title}>
                        <div
                            className={s.posterFeaturesItem}
                            style={{
                                backgroundColor: backgroundColorLeft || '',
                            }}
                        >
                            <div className={s.overlayFeaturesContent}>
                                <PatternPosterData
                                    variant="features"
                                    context={context}
                                    content={content}
                                    title={title}
                                    titlePosition={titlePosition}
                                />
                            </div>

                            <StaticImage
                                desktopImage={desktopImageLeft}
                                mobileImage={mobileImageLeft}
                                fullWidth={true}
                            />
                        </div>
                        <div
                            className={s.posterFeaturesItem}
                            style={{
                                backgroundColor: backgroundColorRight || '',
                            }}
                        >
                            <StaticImage
                                desktopImage={desktopImageRight}
                                mobileImage={mobileImageRight}
                                fullWidth={true}
                            />

                            {CTASet && (
                                <div className={s.buttonPosterFeatures}>
                                    <PatternCTASet set={CTASet} />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default PosterFeaturesVariant;

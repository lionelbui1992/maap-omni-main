import { ButtonControl, PosterItem, PosterProps } from './types';
import { Button, CTAInput, StaticImage } from 'mmds';
import s from './Poster.module.css';
import cn from 'clsx';

const PosterFeaturesAltVariant = ({ block }: PosterProps) => {
    const { items } = block;
    const ButtonSlideSelection = ({ buttonPlacement, CTASet }) => {
        if (buttonPlacement === 'right') {
            return CTASet?.map((item: CTAInput) => {
                return (
                    <Button
                        label={item.label}
                        variant={item.variant}
                        hrefLink={item.hrefLink}
                        icon={item.icon}
                        key={item.label}
                    />
                );
            });
        } else if (buttonPlacement === 'left') {
            return CTASet?.map((item: CTAInput) => {
                return (
                    <Button
                        label={item.label}
                        variant={item.variant}
                        hrefLink={item.hrefLink}
                        icon={item.icon}
                        key={item.label}
                    />
                );
            });
        } else {
            return '';
        }
    };

    return (
        <>
            {items.map((item: PosterItem) => {
                const {
                    desktopImageRight,
                    mobileImageRight,
                    desktopImageLeft,
                    mobileImageLeft,
                    context,
                    buttonPlacementImageSide,
                    backgroundColorLeft,
                    backgroundColorRight,
                } = item;
                const posterFeaturesAltRoot = cn(s.posterFeaturesRoot, {
                    [s.textDarkThemeDesktop]: item.textThemeDesktop,
                    [s.textLightThemeDesktop]: !item.textThemeDesktop,
                    [s.textDarkThemeMobile]: item.textThemeMobile,
                    [s.textLightThemeMobile]: !item.textThemeMobile,
                });

                return (
                    <div className={posterFeaturesAltRoot} key={context}>
                        <div
                            className={s.posterFeaturesItem}
                            style={{
                                backgroundColor: backgroundColorLeft || '',
                            }}
                        >
                            <div
                                className={cn(
                                    s.overlayFeaturesContent,
                                    s.overlayFeaturesAltContent
                                )}
                            >
                                <div
                                    className={cn('mmds-component-one-detail')}
                                >
                                    {context}
                                </div>
                                <div className={s.buttonPlacement}>
                                    {buttonPlacementImageSide?.map(
                                        (item: ButtonControl) => {
                                            return (
                                                item.buttonPlacement ===
                                                    'left' && (
                                                    <ButtonSlideSelection
                                                        buttonPlacement="left"
                                                        CTASet={item.CTASet}
                                                        key={
                                                            item.buttonPlacement
                                                        }
                                                    />
                                                )
                                            );
                                        }
                                    )}
                                </div>
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
                            <div className={s.buttonPosterFeatures}>
                                {buttonPlacementImageSide?.map(
                                    (item: ButtonControl) => {
                                        return (
                                            item.buttonPlacement ===
                                                'right' && (
                                                <ButtonSlideSelection
                                                    buttonPlacement="right"
                                                    CTASet={item.CTASet}
                                                    key={item.buttonPlacement}
                                                />
                                            )
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default PosterFeaturesAltVariant;

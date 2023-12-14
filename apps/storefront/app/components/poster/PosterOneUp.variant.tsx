import { PosterProps } from './types';
import { PatternCTASet, StaticImage } from 'mmds';
import s from './Poster.module.css';
import cn from 'clsx';

const PosterOneUpVariant = ({ block }: PosterProps) => {
    const { items } = block;

    return (
        <div className={s.oneUpRoot}>
            {items?.map((item, index) => {
                const posterOneUpRoot = cn({
                    [s.textDarkThemeDesktop]: item.textThemeDesktop,
                    [s.textLightThemeDesktop]: !item.textThemeDesktop,
                    [s.textDarkThemeMobile]: item.textThemeMobile,
                    [s.textLightThemeMobile]: !item.textThemeMobile,
                });
                return (
                    <div className={posterOneUpRoot} key={index}>
                        <div className={s.posterRoot}>
                            <StaticImage
                                desktopImage={item.desktopImage}
                                mobileImage={item.mobileImage}
                                altDescription={item.title}
                                fullWidth={true}
                            />
                            <div className={s.posterContentPosition}>
                                <div
                                    className={`${s.title} ${s.posterOneUpWidth}`}
                                >
                                    {item.title}
                                </div>
                            </div>
                        </div>
                        {item.CTASet && (
                            <div className={s.buttonStyle}>
                                <PatternCTASet set={item.CTASet} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PosterOneUpVariant;

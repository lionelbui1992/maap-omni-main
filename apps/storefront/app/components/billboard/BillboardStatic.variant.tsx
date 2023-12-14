import {
    Button,
    CTAInput,
    PatternTitleSubtitle,
    slugify,
    StaticImage,
} from 'mmds';
import { BillboardBlockItem, BillboardProps } from './types';
import cn from 'clsx';
import s from './Billboard.module.css';

const BillboardStaticVariant = ({ block }: BillboardProps) => {
    const { items } = block;
    return (
        <div
            className={s.billboardRoot}
            key={`bb_cta_static`}
            data-testid={`bb_cta_static`}
        >
            {items.map((item: BillboardBlockItem, index: number) => {
                const {
                    desktopImage,
                    mobileImage,
                    contentPosition,
                    title,
                    subTitle,
                    ctaSet,
                    titleSize,
                    subTitleSize,
                    containImage,
                } = item;

                const contentPositionWithDefault =
                    contentPosition || 'bottomLeft';

                const contentLayoutClassname = cn({
                    [s.left]: contentPositionWithDefault === 'bottomLeft',
                    [s.center]: contentPositionWithDefault === 'center',
                });
                const buttonContentLayout = cn(s.buttonRoot, {
                    [s.buttonCenter]: contentPositionWithDefault === 'center',
                    [s.buttonBottomLeft]:
                        contentPositionWithDefault === 'bottomLeft',
                });
                const identifier = `bb_cta_static_${slugify(title)}_${index}`;

                return (
                    <div
                        key={identifier}
                        data-testid={identifier}
                        className={containImage ? s.containImage : ''}
                    >
                        <div className={cn(s.billboardRoot)}>
                            <StaticImage
                                desktopImage={desktopImage}
                                mobileImage={mobileImage}
                                altDescription={title}
                                fullWidth={true}
                            />
                            <div
                                className={`${s.overlayContent} ${contentLayoutClassname}`}
                            >
                                <div
                                    className={`${s.content} ${contentLayoutClassname}`}
                                >
                                    {title && (
                                        <PatternTitleSubtitle
                                            title={title}
                                            titleSize={titleSize}
                                            subTitle={subTitle}
                                            subTitleSize={subTitleSize}
                                        />
                                    )}
                                    <div className={buttonContentLayout}>
                                        {ctaSet &&
                                            ctaSet?.map(
                                                (
                                                    item: CTAInput,
                                                    index: number
                                                ) => {
                                                    const variantWithDefault =
                                                        item.variant || 'base';
                                                    return (
                                                        item.hrefLink && (
                                                            <div
                                                                key={`cta_input_${index}`}
                                                            >
                                                                <Button
                                                                    variant={
                                                                        variantWithDefault
                                                                    }
                                                                    hrefLink={
                                                                        item?.hrefLink
                                                                    }
                                                                    label={
                                                                        item.label
                                                                    }
                                                                    icon={
                                                                        item.icon
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BillboardStaticVariant;

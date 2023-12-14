import React from 'react';
import { breakpointMedium } from 'config/styles/breakpoints';
import Image from 'next/image';
import LazyImage from 'components/LazyImage';
import { RenderBlock } from '../../Prismic/PrismicSliceRenderer';
import { blockTransformer } from 'helpers/prismic';
import { useProductPrismicDocuments } from '@lib/providers/ProductPrismicDocumentsProvider';
import { productImagesByPath } from '@lib/productImageUtils';
import PlaceHolder from '../PLACEHODER-IMAGE_1280x1800.jpg';

const LifestyleImages = ({ imagery }) => {
    const { getDocument } = useProductPrismicDocuments();
    const fabricTemperatureInfo = getDocument('fabric-info');
    if (!fabricTemperatureInfo) return null;

    const filteredPDPVideoSlice = fabricTemperatureInfo?.data?.body.filter(
        (slice) => {
            return slice.slice_type === 'pdp_video';
        }
    );

    const lifestyleImagesDesktop1 = productImagesByPath(
        imagery,
        'pdp.lifestyle.01.desktop'
    );
    const lifestyleImagesDesktop2 = productImagesByPath(
        imagery,
        'pdp.lifestyle.02.desktop'
    );
    const lifestyleImagesMobile1 = productImagesByPath(
        imagery,
        'pdp.lifestyle.01.mobile'
    );
    const lifestyleImagesMobile2 = productImagesByPath(
        imagery,
        'pdp.lifestyle.02.mobile'
    );

    return (
        <section>
            {lifestyleImagesDesktop1 &&
                lifestyleImagesDesktop1.map((image) => (
                    <div className="large" key={`ad_desktop_${image.src}`}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={2000}
                            height={1200}
                            placeholder={'blur'}
                            layout={'responsive'}
                            blurDataURL={PlaceHolder.blurDataURL}
                            className="fullWidth"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                ))}
            {lifestyleImagesDesktop2 &&
                lifestyleImagesDesktop2.map((image) => (
                    <div className="large" key={`ad_desktop_${image.src}`}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={2000}
                            height={1200}
                            placeholder={'blur'}
                            blurDataURL={PlaceHolder.blurDataURL}
                            className="fullWidth"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                ))}
            {lifestyleImagesMobile1 &&
                lifestyleImagesMobile1.map((image) => (
                    <div
                        className="small hidden_on_mobile"
                        key={`ad_mobile_${image.src}`}
                    >
                        <LazyImage
                            src={image.src}
                            alt={image.alt}
                            className="fullWidth"
                        />
                    </div>
                ))}
            {lifestyleImagesMobile2 &&
                lifestyleImagesMobile2.map((image) => (
                    <div
                        className="small hidden_on_mobile"
                        key={`ad_mobile_${image.src}`}
                    >
                        <LazyImage
                            src={image.src}
                            alt={image.alt}
                            className="fullWidth"
                        />
                    </div>
                ))}
            {filteredPDPVideoSlice.map((data) => {
                return (
                    data?.primary?.position ===
                        'Full Width Video Position 4' && (
                        <div className="pdpVideo">
                            <RenderBlock block={blockTransformer(data)} />
                        </div>
                    )
                );
            })}
            <style jsx global>
                {`
                    .fullWidth {
                        width: 100%;
                    }
                `}
            </style>
            <style jsx>
                {`
                    section {
                        display: flex;
                        flex-wrap: wrap;
                    }
                    div {
                        flex: 1 0 100%;
                    }
                    .pdpVideo {
                        width: 100%;
                    }
                    .large {
                        display: initial;
                    }
                    .small {
                        display: none;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        section {
                            flex-direction: column;
                        }
                        div {
                            flex: 1 0 100%;
                        }
                        .large {
                            display: none;
                        }
                        .small {
                            display: block;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default LifestyleImages;

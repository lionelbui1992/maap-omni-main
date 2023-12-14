import React from 'react';
import PropTypes from 'prop-types';
import LazyImage from 'components/LazyImage';
import { blockTransformer } from 'helpers/prismic';
import { RenderBlock } from 'containers/Prismic/PrismicSliceRenderer';
import { breakpointLarge, breakpointMedium } from 'config/styles/breakpoints';
import { useProductPrismicDocuments } from '@lib/providers/ProductPrismicDocumentsProvider';
import { productImagesByPath } from '@lib/productImageUtils';

const ProductSpecsGrid = ({ isMobile, isTablet, imagery }) => {
    const { getDocument } = useProductPrismicDocuments();

    const fabricTemperatureInfo = getDocument('fabric-info');
    if (!fabricTemperatureInfo) return null;

    const fabricInfo =
        fabricTemperatureInfo && fabricTemperatureInfo?.data?.body
            ? fabricTemperatureInfo?.data?.body[0]
            : null;
    const temperatureInfo =
        fabricTemperatureInfo && fabricTemperatureInfo?.data?.body
            ? fabricTemperatureInfo?.data?.body[1]
            : null;
    const filteredPDPVideoSlice = fabricTemperatureInfo?.data?.body.filter(
        (slice) => {
            return slice.slice_type === 'pdp_video';
        }
    );
    const filterTile1Video = filteredPDPVideoSlice?.filter(
        (tile) => tile?.primary?.position === 'Tile Video Position 1'
    );
    const filterTile2Video = filteredPDPVideoSlice?.filter(
        (tile) => tile?.primary?.position === 'Tile Video Position 2'
    );

    const tileOneSectionImagesDesktop = productImagesByPath(
        imagery,
        'pdp.specs.02.desktop'
    );
    const tileOneSectionImagesMobile = productImagesByPath(
        imagery,
        'pdp.specs.02.mobile'
    );
    const tileTwoSectionImagesDesktop = productImagesByPath(
        imagery,
        'pdp.specs.03.desktop'
    );
    const tileTwoSectionImagesMobile = productImagesByPath(
        imagery,
        'pdp.specs.03.mobile'
    );

    const fabricSectionImagesDesktopVariant1 = productImagesByPath(
        imagery,
        'pdp.specs.01.desktop.variant.01'
    );
    const fabricSectionImagesDesktopVariant2 = productImagesByPath(
        imagery,
        'pdp.specs.01.desktop.variant.02'
    );

    return (
        <section className="productSpecs">
            <div className="container desktopContent hidden_on_mobile">
                {/*<div className="column specsColumn heightMatch">*/}
                {/*    {fabricInfo && (*/}
                {/*        <RenderBlock*/}
                {/*            block={blockTransformer(fabricInfo)}*/}
                {/*            isMobile={isMobile}*/}
                {/*            isTablet={isTablet}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*    {temperatureInfo && (*/}
                {/*        <RenderBlock*/}
                {/*            block={blockTransformer(temperatureInfo)}*/}
                {/*            isMobile={isMobile}*/}
                {/*            isTablet={isTablet}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</div>*/}
                <div className="column specsColumn">
                    <div className="medium">
                        {fabricSectionImagesDesktopVariant1?.[0]?.src && (
                            <LazyImage
                                src={
                                    fabricSectionImagesDesktopVariant1?.[0]?.src
                                }
                                alt={
                                    fabricSectionImagesDesktopVariant1?.[0]?.alt
                                }
                                className="fullWidth imageMatch"
                            />
                        )}
                    </div>
                    <div className="large">
                        {fabricSectionImagesDesktopVariant2?.[0]?.src && (
                            <LazyImage
                                src={
                                    fabricSectionImagesDesktopVariant2?.[0]?.src
                                }
                                alt={
                                    fabricSectionImagesDesktopVariant2?.[0]?.alt
                                }
                                className="fullWidth imageMatch"
                            />
                        )}
                    </div>
                </div>
            </div>

            {filteredPDPVideoSlice.map((data) => {
                return (
                    data?.primary?.position ===
                        'Full Width Video Position 1' && (
                        <div className="videoBlock hidden_on_mobile">
                            <RenderBlock block={blockTransformer(data)} />
                        </div>
                    )
                );
            })}

            <div className="container">
                <div className="column">
                    {filterTile1Video.length ? (
                        filteredPDPVideoSlice.map((data) => {
                            return (
                                data?.primary?.position ===
                                    'Tile Video Position 1' && (
                                    <div className="videoBlock hidden_on_desktop">
                                        <RenderBlock
                                            block={blockTransformer(data)}
                                        />
                                    </div>
                                )
                            );
                        })
                    ) : (
                        <div className="small">
                            {tileOneSectionImagesMobile && (
                                <LazyImage
                                    src={tileOneSectionImagesMobile[0]?.src}
                                    alt={tileOneSectionImagesMobile[0]?.alt}
                                    className="fullWidth"
                                />
                            )}
                        </div>
                    )}

                    {filterTile1Video.length ? (
                        filteredPDPVideoSlice.map((data) => {
                            return (
                                data?.primary?.position ===
                                    'Tile Video Position 1' && (
                                    <div className="videoBlock hidden_on_mobile">
                                        <RenderBlock
                                            block={blockTransformer(data)}
                                        />
                                    </div>
                                )
                            );
                        })
                    ) : (
                        <div className="mediumPlus">
                            {tileOneSectionImagesDesktop && (
                                <LazyImage
                                    src={tileOneSectionImagesDesktop[0]?.src}
                                    alt={tileOneSectionImagesDesktop[0]?.alt}
                                    className="fullWidth"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/*<div className="column hidden_on_desktop">*/}
                {/*    {fabricInfo && (*/}
                {/*        <RenderBlock*/}
                {/*            block={blockTransformer(fabricInfo)}*/}
                {/*            isMobile={isMobile}*/}
                {/*            isTablet={isTablet}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</div>*/}

                {filteredPDPVideoSlice.map((data) => {
                    return (
                        data?.primary?.position ===
                            'Full Width Video Position 1' && (
                            <div className="videoBlock hidden_on_desktop">
                                <RenderBlock block={blockTransformer(data)} />
                            </div>
                        )
                    );
                })}

                <div className="column">
                    {filterTile2Video.length ? (
                        filteredPDPVideoSlice.map((data) => {
                            return (
                                data?.primary?.position ===
                                    'Tile Video Position 2' && (
                                    <div className="videoBlock hidden_on_desktop">
                                        <RenderBlock
                                            block={blockTransformer(data)}
                                        />
                                    </div>
                                )
                            );
                        })
                    ) : (
                        <div className="small">
                            {tileTwoSectionImagesMobile && (
                                <LazyImage
                                    src={tileTwoSectionImagesMobile[0]?.src}
                                    alt={tileTwoSectionImagesMobile[0]?.alt}
                                    className="fullWidth"
                                />
                            )}
                        </div>
                    )}

                    {filterTile2Video.length ? (
                        filteredPDPVideoSlice.map((data) => {
                            return (
                                data?.primary?.position ===
                                    'Tile Video Position 2' && (
                                    <div className="videoBlock hidden_on_mobile">
                                        <RenderBlock
                                            block={blockTransformer(data)}
                                        />
                                    </div>
                                )
                            );
                        })
                    ) : (
                        <div className="mediumPlus">
                            {tileTwoSectionImagesDesktop && (
                                <LazyImage
                                    src={tileTwoSectionImagesDesktop[0]?.src}
                                    alt={tileTwoSectionImagesDesktop[0]?.alt}
                                    className="fullWidth"
                                />
                            )}
                        </div>
                    )}

                    {/*<div className="column hidden_on_desktop">*/}
                    {/*    {temperatureInfo && (*/}
                    {/*        <RenderBlock*/}
                    {/*            block={blockTransformer(temperatureInfo)}*/}
                    {/*            isMobile={isMobile}*/}
                    {/*            isTablet={isTablet}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </div>
            </div>
            {filteredPDPVideoSlice.map((data) => {
                return (
                    data?.primary?.position ===
                        'Full Width Video Position 2' && (
                        <div className="videoBlock">
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
                    .heightMatch {
                        top: 0;
                        height: 100%;
                        background-color: rgb(255, 255, 255);
                    }
                    .column {
                        flex: 1;
                    }
                    .videoBlock {
                        width: 100%;
                    }
                    @media (max-width: ${breakpointMedium}) {
                        .small {
                            display: block;
                        }
                        .medium {
                            display: none;
                        }
                        .mediumPlus {
                            display: none;
                        }
                    }
                    @media (min-width: ${breakpointMedium}) {
                        .small {
                            display: none;
                        }
                        .medium {
                            display: block;
                        }
                        .mediumPlus {
                            display: block;
                        }
                    }

                    .specsColumn:last-child {
                        position: relative;
                    }

                    @media (max-width: ${breakpointLarge}) {
                        .large {
                            display: none;
                        }
                    }
                    @media (min-width: ${breakpointLarge}) {
                        .large {
                            display: block;
                        }
                        .medium {
                            display: none;
                        }
                    }
                    .container {
                        display: flex;
                        flex-direction: row;
                        margin: 0 auto;
                        position: relative;
                    }

                    @media (max-width: ${breakpointMedium}) {
                        .container {
                            flex-direction: column;
                        }
                    }
                    @media (min-width: ${breakpointMedium}) {
                        .column {
                            background-color: rgb(230, 230, 230);
                        }
                    }
                `}
            </style>
        </section>
    );
};

ProductSpecsGrid.propTypes = {
    product: PropTypes.object.isRequired,
    isMobile: PropTypes.bool,
    isTablet: PropTypes.bool,
};

export default ProductSpecsGrid;

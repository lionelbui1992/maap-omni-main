import React from 'react';
import { breakpointMedium } from 'config/styles/breakpoints';
import LazyImage from 'components/LazyImage';
import { RenderBlock } from '../../Prismic/PrismicSliceRenderer';
import { blockTransformer } from 'helpers/prismic';
import { useProductPrismicDocuments } from '@lib/providers/ProductPrismicDocumentsProvider';
import { productImagesByPath } from '@lib/productImageUtils';

const AdditionalImages = ({ imagery }) => {
    const { getDocument } = useProductPrismicDocuments();

    const fabricTemperatureInfo = getDocument('fabric-info');
    if (!fabricTemperatureInfo) return null;

    const filteredPDPVideoSlice = fabricTemperatureInfo?.data?.body.filter(
        (slice) => {
            return slice.slice_type === 'pdp_video';
        }
    );
    const filterTile3Video = filteredPDPVideoSlice?.filter(
        (tile) => tile?.primary?.position === 'Tile Video Position 3'
    );
    const filterTile4Video = filteredPDPVideoSlice?.filter(
        (tile) => tile?.primary?.position === 'Tile Video Position 4'
    );

    const additionalImagesDesktop1 = productImagesByPath(
        imagery,
        'pdp.additional.images.01.desktop'
    );
    const additionalImagesDesktop2 = productImagesByPath(
        imagery,
        'pdp.additional.images.02.desktop'
    );
    const additionalImagesMobile1 = productImagesByPath(
        imagery,
        'pdp.additional.images.01.mobile'
    );
    const additionalImagesMobile2 = productImagesByPath(
        imagery,
        'pdp.additional.images.02.mobile'
    );

    return (
        <section>
            {filterTile3Video.length
                ? filteredPDPVideoSlice.map((data) => {
                      return (
                          data?.primary?.position ===
                              'Tile Video Position 3' && (
                              <div className="pdpVideo hidden_on_mobile">
                                  <RenderBlock
                                      block={blockTransformer(data)}
                                      key={data.key}
                                  />
                              </div>
                          )
                      );
                  })
                : additionalImagesDesktop1 &&
                  additionalImagesDesktop1.map((image) => (
                      <div className="large" key={`ad_desktop_${image.src}`}>
                          <LazyImage
                              src={image.src}
                              alt={image.alt}
                              className="fullWidth"
                          />
                      </div>
                  ))}

            {filterTile4Video.length
                ? filteredPDPVideoSlice.map((data) => {
                      return (
                          data?.primary?.position ===
                              'Tile Video Position 4' && (
                              <div className="pdpVideo hidden_on_mobile">
                                  <RenderBlock
                                      block={blockTransformer(data)}
                                      key={data.key}
                                  />
                              </div>
                          )
                      );
                  })
                : additionalImagesDesktop2 &&
                  additionalImagesDesktop2.map((image) => (
                      <div className="large" key={`ad_desktop_${image.src}`}>
                          <LazyImage
                              src={image.src}
                              alt={image.alt}
                              className="fullWidth"
                          />
                      </div>
                  ))}

            {filterTile3Video.length
                ? filteredPDPVideoSlice.map((data) => {
                      return (
                          data?.primary?.position ===
                              'Tile Video Position 3' && (
                              <div className="pdpVideo hidden_on_desktop">
                                  <RenderBlock
                                      block={blockTransformer(data)}
                                      key={data.key}
                                  />
                              </div>
                          )
                      );
                  })
                : additionalImagesMobile1 &&
                  additionalImagesMobile1.map((image) => (
                      <div className="small" key={`ad_mobile_${image.src}`}>
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
                        'Full Width Video Position 3' && (
                        <div className="pdpVideo hidden_on_desktop">
                            <RenderBlock
                                block={blockTransformer(data)}
                                key={data.key}
                            />
                        </div>
                    )
                );
            })}

            {filterTile4Video.length
                ? filteredPDPVideoSlice.map((data) => {
                      return (
                          data?.primary?.position ===
                              'Tile Video Position 4' && (
                              <div className="pdpVideo hidden_on_desktop">
                                  <RenderBlock
                                      block={blockTransformer(data)}
                                      key={data.key}
                                  />
                              </div>
                          )
                      );
                  })
                : additionalImagesMobile2 &&
                  additionalImagesMobile2.map((image) => (
                      <div className="small" key={`ad_mobile_${image.src}`}>
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
                        'Full Width Video Position 3' && (
                        <div className="pdpVideo hidden_on_mobile">
                            <RenderBlock
                                block={blockTransformer(data)}
                                key={data.key}
                            />
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
                        flex: 1 0 50%;
                    }
                    .large {
                        display: initial;
                    }
                    .small {
                        display: none;
                    }
                    .pdpVideo {
                        width: 100%;
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

export default AdditionalImages;

import React from 'react';
import Image from 'containers/Prismic/PrismicComponents/Image';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { brandWhite } from 'config/styles/colours';

const SideCartPrismicImage = ({ config }) => {
    if (!config) return null;
    const { image, image_link, image_link_type, image_overlay_text } =
        config.data;

    if (!image || !image.url) return null;

    return (
        <>
            <section>
                <Image
                    src={image.url}
                    link_type={image_link_type}
                    link={image_link}
                    image_alt_text={image.alt}
                />
                <div className="overLayText">
                    {RichText.render(image_overlay_text)}
                </div>
            </section>
            <style jsx>
                {`
                    section {
                        position: relative;
                        height: 100%;
                    }
                    .overLayText {
                        position: absolute;
                        bottom: 0;
                        left: 16px;
                        color: ${brandWhite};
                        font-size: 20px;
                    }
                `}
            </style>
        </>
    );
};

SideCartPrismicImage.propTypes = {
    config: PropTypes.object,
};

export default SideCartPrismicImage;

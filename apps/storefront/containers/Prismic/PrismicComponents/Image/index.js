import React from 'react';
import SSRLink from 'helpers/SSRLink';
import LazyImage from 'components/LazyImage';

const Image = ({
    src,
    image_alt_text,
    link,
    link_title,
    link_type,
    gtm_identifier,
    tile_image_height,
}) => {
    if (link) {
        return (
            <SSRLink
                linkType={link_type}
                linkUrl={link}
                title={link_title}
                gtm_identifier={gtm_identifier}
                gtm_value="0"
                styles={{ padding: 0, display: 'block', cursor: 'pointer' }}
            >
                <LazyImage
                    style={{ width: '100%' }}
                    src={src}
                    alt={image_alt_text || link_title}
                />
            </SSRLink>
        );
    }
    return (
        <>
            <img src={src} alt={image_alt_text || link_title} />
            <style jsx>
                {`
                    img {
                        display: block;
                        width: 100%;
                        ${tile_image_height === 'Yes' ? 'height: 100%' : ''};
                    }
                `}
            </style>
        </>
    );
};

export default Image;

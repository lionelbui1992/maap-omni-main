import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Swatch from 'components/Swatch';
import { breakpointMedium } from 'config/styles/breakpoints';
import parse from 'fast-json-parse';

const ProductSiblings = ({ product }) => {
    if (!product) return null;

    const router = useRouter();

    let siblings = [];
    const metafield = product.metafields.filter((metafield) => {
        if (!metafield) return false;
        return (
            metafield.namespace === 'related_products' &&
            metafield.key === 'siblings'
        );
    })[0];

    if (!metafield) return null;

    const parseResult = parse(metafield.value);

    if (parseResult.err) {
        console.log('unable to parse json', parseResult.err.message);
    } else {
        siblings = parseResult.value;
    }

    if (!siblings.length) return null;

    return (
        <nav>
            {siblings.map((sibling) => {
                return (
                    <Swatch
                        handle={sibling.handle}
                        colour={sibling.swatchColour}
                        title={sibling.title}
                        image={sibling.image}
                        selected={router.query.handle === sibling.handle}
                        key={sibling.handle}
                        mobileSize="20px"
                    />
                );
            })}

            <style jsx>
                {`
                    nav {
                        display: grid;
                        grid-template-columns: repeat(12, 1fr);
                        text-transform: capitalize;
                        align-items: center;
                        align-items: stretch;
                    }

                    @media (max-width: ${breakpointMedium}) {
                        nav {
                            display: grid;
                            grid-template-columns: repeat(8, 1fr);
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    nav > .siblingLink {
                        text-decoration: none;
                    }
                `}
            </style>
        </nav>
    );
};

ProductSiblings.propTypes = {
    product: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductSiblings;

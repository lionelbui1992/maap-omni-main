import React from 'react';
import PropTypes from 'prop-types';
import { useShop } from '@lib/providers/ShopProvider';

const Pricing = ({
    currentPrice,
    previousPrice,
    discountAmount,
    className,
}) => {
    const { defaultCurrencyCode, defaultCurrencySymbol } = useShop();

    const price = (value) => {
        if (value === 'NaN') return 0.0;
        return parseFloat(value).toFixed(2);
    };

    return (
        <span className={`${className} pricing`}>
            {!!currentPrice && !discountAmount && (
                <span className="pricing__current">
                    {defaultCurrencySymbol}
                    {price(currentPrice)}
                    {` ${defaultCurrencyCode}`}
                </span>
            )}
            {!!discountAmount &&
                parseFloat(discountAmount) < parseFloat(currentPrice) && (
                    <>
                        <span className="pricing__current">
                            {defaultCurrencySymbol}
                            {price(currentPrice - discountAmount)}
                            {` ${defaultCurrencyCode}`}
                        </span>
                        <br />
                    </>
                )}
            {!!discountAmount &&
                parseFloat(discountAmount) >= parseFloat(currentPrice) && (
                    <>
                        <span className="pricing__current">Free</span>
                        <br />
                    </>
                )}
            {!!discountAmount && (
                <span className="pricing__previous">
                    {' '}
                    <del>
                        {defaultCurrencySymbol}
                        {price(currentPrice)}
                        {` ${defaultCurrencyCode}`}
                    </del>
                </span>
            )}
            {!currentPrice && typeof currentPrice !== 'undefined' && (
                <span className="pricing__current">Free</span>
            )}
            {previousPrice &&
                parseFloat(previousPrice) > parseFloat(currentPrice) && (
                    <span className="pricing__previous">
                        {' '}
                        <del>
                            {defaultCurrencySymbol}
                            {price(previousPrice && previousPrice)}
                            {` ${defaultCurrencyCode}`}
                        </del>
                    </span>
                )}
            <style jsx>
                {`
                    .side_cart_subtotal__price .pricing__current {
                        font-size: 1.5em;
                        font-weight: 300;
                    }
                `}
            </style>
        </span>
    );
};

Pricing.propTypes = {
    currentPrice: PropTypes.any.isRequired,
    previousPrice: PropTypes.any,
    discountAmount: PropTypes.any,
    className: PropTypes.string,
};

export default Pricing;

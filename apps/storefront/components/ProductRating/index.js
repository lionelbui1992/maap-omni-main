import React, { useEffect } from 'react';

const ProductRating = ({ variantSkus, productID }) => {
    const executeScriptsAfterLoad = () => {
        document.addEventListener('rating-code-ready', () => {
            const initialiserScript = document.createElement('script');
            initialiserScript.onload = function () {
                document.dispatchEvent(new Event('rating-widget-initialsed'));
            };
            initialiserScript.src = '/js/ratingWidget.js';
            document
                .getElementsByTagName('head')[0]
                .appendChild(initialiserScript);
        });

        const ratingScript = document.createElement('script');
        ratingScript.onload = function () {
            document.dispatchEvent(new Event('rating-code-ready'));
        };
        ratingScript.src = 'https://widget.reviews.io/rating-snippet/dist.js';

        document.getElementsByTagName('head')[0].appendChild(ratingScript);
    };

    useEffect(() => {
        const container = document.getElementById('reviewsWidget');
        executeScriptsAfterLoad(container);
    }, [productID]);

    return (
        <section>
            <div
                key={`ratings-widget-div-${variantSkus.length}`}
                className="ruk_rating_snippet"
                data-sku={variantSkus.join(';')}
                onClick={() => {
                    const reviewsSection =
                        document.getElementById('product-reviews');
                    const pos = reviewsSection.style.position;
                    const top = reviewsSection.style.top;
                    reviewsSection.style.position = 'relative';
                    reviewsSection.style.top = '-50px';
                    reviewsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                    reviewsSection.style.top = top;
                    reviewsSection.style.position = pos;
                    return false;
                }}
            />
        </section>
    );
};

export default ProductRating;

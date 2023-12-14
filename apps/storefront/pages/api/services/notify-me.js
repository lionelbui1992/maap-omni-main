module.exports = async (req, res) => {
    const { region, variantId, emailAddress } = req.body;
    let accountId = 'an79Sm';

    if (region === 'US') accountId = 'spuDKT';
    if (region === 'EU') accountId = 'K5Bis4';
    if (region === 'UK') accountId = 'YwMLxd';

    const decodedVariantId = variantId.replace(
        'gid://shopify/ProductVariant/',
        ''
    );

    const response = await fetch(
        `https://a.klaviyo.com/api/v1/catalog/subscribe`,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `a=${accountId}&platform=shopify&variant=${decodedVariantId}&email=${emailAddress}`,
        }
    );

    const responseObject = await response.json();

    let message = "Thanks, We'll notify you when it's back in stock.";
    if (
        responseObject.message ===
        'There was something wrong with your request: * email   * Enter a valid email address.'
    ) {
        message = 'Please ensure your email address is correct.';
    } else if (responseObject.status && responseObject.status !== 200) {
        message =
            'Oops, something went wrong and we were unable to add you to our list at this time. Please contact us for help.';
    }

    res.json({
        code: message.status,
        message,
    });
};

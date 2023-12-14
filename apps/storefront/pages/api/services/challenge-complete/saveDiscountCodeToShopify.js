const getShopifyAdminUrl = region => {
    if (region === 'RETAIL')
        return `https://${process.env.SHOPIFY_DOMAIN_RETAIL}/admin/api/2021-10/`;
    if (region === 'US')
        return `https://${process.env.SHOPIFY_DOMAIN_US}/admin/api/2021-10/`;
    if (region === 'EU')
        return `https://${process.env.SHOPIFY_DOMAIN_EU}/admin/api/2021-10/`;
    if (region === 'UK')
        return `https://${process.env.SHOPIFY_DOMAIN_UK}/admin/api/2021-10/`;
    return `https://${process.env.SHOPIFY_DOMAIN_INT}/admin/api/2021-10/`;
};

const getAdminAPIToken = region => {
    if (region === 'RETAIL') return process.env.SHOPIFY_API_TOKEN_RETAIL;
    if (region === 'US') return process.env.SHOPIFY_API_TOKEN_US;
    if (region === 'EU') return process.env.SHOPIFY_API_TOKEN_EU;
    if (region === 'UK') return process.env.SHOPIFY_API_TOKEN_UK;
    return process.env.SHOPIFY_API_TOKEN_INT;
};

const getPriceRuleID = region => {
    if (region === 'RETAIL') return process.env.SHOPIFY_PRICE_RULE_ID_RETAIL;
    if (region === 'US') return process.env.SHOPIFY_PRICE_RULE_ID_US;
    if (region === 'EU') return process.env.SHOPIFY_PRICE_RULE_ID_EU;
    if (region === 'UK') return process.env.SHOPIFY_PRICE_RULE_ID_UK;
    return process.env.SHOPIFY_PRICE_RULE_ID_INT;
};

export async function saveDiscountCodeToShopify(
    region,
    discountCode,
    discountRuleId
) {
    const apiUrl = `${getShopifyAdminUrl(
        region
    )}/price_rules/${discountRuleId}/discount_codes.json`;

    const payload = {
        discount_code: {
            code: discountCode,
        },
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Shopify-Access-Token': getAdminAPIToken(region),
        },
        body: JSON.stringify(payload),
    })
        .then(r => r.json())
        .then(data => data);

    return response;
}

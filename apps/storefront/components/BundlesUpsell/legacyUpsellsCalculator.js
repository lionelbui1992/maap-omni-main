export default function getUpsellMessage(lineItems) {
    // Gather all types that are in the cart
    var allTypes = [];

    const hasBundleId = (item) =>
        item.node.customAttributes.some(
            (attribute) => attribute.key === '_bundle_id'
        );

    const itemWithBundleId = lineItems.some(hasBundleId);

    lineItems.forEach(function (edge) {
        if (itemWithBundleId) {
            return;
        }

        const type = edge.node.variant?.product?.productType;

        if (
            !!edge.node.variant?.compareAtPriceV2?.amount &&
            edge.node.variant.priceV2.amount <
                edge.node.variant?.compareAtPriceV2?.amount
        ) {
            return;
        }

        if (!allTypes.indexOf(type) > -1) {
            allTypes.push(type);
        }
    });

    // The acceptable types for Bibs, Jerseys, and Socks
    const bibTypes =
        "Bib Shorts, Women's Bib Shorts, Long Bib, Women's Long Bib, Women's Bib Short".split(
            ', '
        );
    const jerseyTypes =
        "Jersey, Long Sleeve Jersey, Women's Jersey, Women's Long Sleeve Jerseys".split(
            ', '
        );
    const sockTypes = 'Socks'.split(', ');

    // Find out which of these types are currently in the cart
    const hasBib = allTypes.some(function (type) {
        return bibTypes.indexOf(type) > -1;
    });
    const hasJersey = allTypes.some(function (type) {
        return jerseyTypes.indexOf(type) > -1;
    });
    const hasSocks = allTypes.some(function (type) {
        return sockTypes.indexOf(type) > -1;
    });

    // Determine the message to display to customer
    let message = null;
    if (hasBib && hasJersey && hasSocks) {
        message = null;
    } else if (hasBib && hasJersey) {
        message =
            'Save 15% by completing our MAAP Kits bundle. Simply add your choice of full price Socks';
    } else if (hasSocks && hasJersey) {
        message =
            'Save 15% by completing our MAAP Kits bundle. Simply add your choice of full price Bib Shorts or Tights';
    } else if (hasSocks && hasBib) {
        message =
            'Save 15% by completing our MAAP Kits bundle. Simply add your choice of full price Jersey';
    } else if (hasBib) {
        message =
            'Save 15% by completing our MAAP Kits bundle. Simply add your choice of full price Jersey and Socks';
    } else if (hasJersey) {
        message =
            'Save 15% by completing our MAAP Kits bundle. Simply add your choice of full price Bib Shorts or Tights and Socks';
    } else if (hasSocks) {
        message =
            'Save 15% by completing our MAAP Kits bundle. Simply add your choice of full price Jersey and Bib Shorts or Tights';
    }

    return message;
}

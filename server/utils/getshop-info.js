const { SHOPIFY_API_VERSION } = process.env;

const getShopInfo = async (accessToken, shop) => {
    const query = JSON.stringify({
        query: `{
            shop {
                contactEmail
                currencyCode
                email
                ianaTimezone
                timezoneAbbreviation
                timezoneOffset
                plan {
                    displayName
                    partnerDevelopment
                    shopifyPlus
                }
                url
            }
        }`,
    });

    const response = await fetch(
        `https://${shop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken,
            },
            body: query,
        },
    );

    const responseJson = await response.json();
    const shopInfo = responseJson.data.shop;

    return shopInfo;
};

module.exports = getShopInfo;

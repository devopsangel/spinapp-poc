const { APP_BILLING_CONFIRM_URL, APP_TEST_CHARGE, SHOPIFY_API_VERSION } = process.env;

const getSubscriptionUrl = async (ctx, accessToken, shop) => {
    const query = JSON.stringify({
        query: `mutation {
            appSubscriptionCreate(
            name: "Basic - Monthly"
            returnUrl: "${APP_BILLING_CONFIRM_URL}"
            test: ${APP_TEST_CHARGE}
            trialDays: 7
            lineItems: [
                {
                    plan: {
                        appRecurringPricingDetails: {
                            price: { amount: 6.99, currencyCode: USD }
                        }
                    }
                }
            ]
            ) {
                userErrors {
                    field
                    message
                }
                confirmationUrl
                appSubscription {
                    id
                }
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
    const confirmationUrl = responseJson.data.appSubscriptionCreate.confirmationUrl;

    return ctx.redirect(confirmationUrl);
};

module.exports = getSubscriptionUrl;

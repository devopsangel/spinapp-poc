const Router = require('koa-router');
const axios = require('axios');

const { SHOPIFY_API_VERSION, SHOPIFY_API_KEY, APP_HOST } = process.env;

const { activate } = require('../utils/billing-change.js')();

module.exports = () => {
    const router = new Router({ prefix: '/billing' });

    router.get('/activate', async (ctx) => {
        const {
            query: { charge_id },
            session: { accessToken, shop },
        } = ctx;

        const chargeResponse = await axios.get(
            `https://${shop}/admin/api/${SHOPIFY_API_VERSION}/recurring_application_charges/${charge_id}.json`,
            {
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                },
            },
        );
        if (!chargeResponse.error && chargeResponse.status === 200) {
            const {
                data: {
                    recurring_application_charge: { return_url, status },
                },
            } = chargeResponse;

            if (status === 'active') await activate({ accessToken, shop });

            ctx.statusCode = 201;
        } else {
            ctx.statusCode = 200;
        }

        ctx.redirect(`https://${shop}/admin/apps/${SHOPIFY_API_KEY}`);
    });

    return router;
};

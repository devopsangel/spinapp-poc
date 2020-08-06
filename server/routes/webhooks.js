const Router = require('koa-router');
const { receiveWebhook } = require('@shopify/koa-shopify-webhooks');

const { appUninstall } = require('../utils/app-uninstalled.js')();
const { SHOPIFY_API_SECRET_KEY } = process.env;

module.exports = () => {
    const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });
    const router = new Router({ prefix: '/webhooks' });

    // app/uninstalled
    router.post('/app/uninstalled', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        await appUninstall({ shop });
        console.log(`> [INFO] received webhook -- shop <${shop}>:<${ctx.state.webhook}>`);
    });

    return router;
};

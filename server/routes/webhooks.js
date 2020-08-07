const Router = require('koa-router');
const { receiveWebhook } = require('@shopify/koa-shopify-webhooks');

const { appUninstall } = require('../utils/app-uninstalled.js')();
const { SHOPIFY_API_SECRET_KEY } = process.env;

module.exports = () => {
    const webhook = receiveWebhook({
        secret: SHOPIFY_API_SECRET_KEY,
    });
    const router = new Router({ prefix: '/webhooks' });

    // app/uninstalled
    router.post('/app/uninstalled', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(post) -- shop <${shop}>`);

        await appUninstall({ shop });
        ctx.statusCode = 200;
        ctx.body = '';
    });

    // products/create
    router.get('/products/create', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(get) -- shop <${shop}>`);

        ctx.status = 200;
        ctx.body = 'Pong';
    });
    router.post('/products/create', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(post) -- shop <${shop}>`);

        ctx.statusCode = 200;
        ctx.body = '';
    });

    // products/update
    router.get('/products/update', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(get) -- shop <${shop}>`);

        ctx.status = 200;
        ctx.body = 'Pong';
    });
    router.post('/products/update', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(post) -- shop <${shop}>`);

        ctx.statusCode = 200;
        ctx.body = '';
    });

    // products/delete
    router.get('/products/delete', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(get) -- shop <${shop}>`);

        ctx.status = 200;
        ctx.body = 'Pong';
    });
    router.post('/products/delete', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(post) -- shop <${shop}>`);

        ctx.statusCode = 200;
        ctx.body = '';
    });

    // orders/updated
    router.get('/orders/updated', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(get) -- shop <${shop}>`);

        ctx.status = 200;
        ctx.body = 'Pong';
    });
    router.post('/orders/updated', webhook, async (ctx) => {
        const shop = ctx.request.header['x-shopify-shop-domain'];
        console.log(`> [INFO] Received webhook(post) -- shop <${shop}>`);

        ctx.statusCode = 200;
        ctx.body = '';
    });

    return router;
};

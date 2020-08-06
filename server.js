require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();

const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');

// installing app and other properties
const installApp = require('./server/utils/install-app');

// helper to retrieve billing confirmation url
const getSubscriptionUrl = require('./server/utils/billing-confirmation');

// custom routes
const webhookRouter = require('./server/routes/webhooks')(Router);
const billingRouter = require('./server/routes/billing')(Router);

// environment variables
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, APP_HOST } = process.env;
const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    server.use(logger());
    server.use(session({ sameSite: 'none', secure: true }, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];

    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            // scopes: ['read_products', 'write_products', 'read_orders', 'read_all_orders'],
            scopes: ['read_products', 'write_products', 'read_orders'],
            accessMode: 'offline',
            afterAuth: async (ctx) => {
                const { shop, accessToken } = ctx.session;
                ctx.cookies.set('shopOrigin', shop, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none',
                });

                // register the shop in Firestore
                const installResponse = await installApp({
                    accessToken,
                    shop,
                    APP_HOST,
                });
                if (installResponse.status === 201) {
                    // present user with billing options
                    await getSubscriptionUrl(ctx, accessToken, shop, APP_HOST);
                }
            },
        }),
    );

    //  webhook routes
    server.use(bodyParser());
    server.use(webhookRouter.routes());
    server.use(webhookRouter.allowedMethods());

    server.use(verifyRequest());

    //	billing routes
    server.use(billingRouter.routes());
    server.use(billingRouter.allowedMethods());

    server.use(graphQLProxy({ version: ApiVersion.October19 }));
    router.get('(.*)', verifyRequest(), async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    });

    server.use(router.allowedMethods());
    server.use(router.routes());

    server.listen(port, () => {
        if (dev) {
            console.log(`> [INFO] API Secret: ${SHOPIFY_API_SECRET_KEY}`);
            console.log(`> [INFO] API Key: ${SHOPIFY_API_KEY}`);
        }
        console.log(`> [SERVER] Listening on http://localhost:${port}`);
    });
});

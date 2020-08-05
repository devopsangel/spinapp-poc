require('isomorphic-fetch');
const dotenv = require('dotenv');

const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const logger = require('koa-logger');

//	environment variables
dotenv.config();
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, APP_HOST } = process.env;
const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
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
            afterAuth(ctx) {
                const { shop, accessToken } = ctx.session;
                ctx.cookies.set('shopOrigin', shop, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none',
                });

                ctx.redirect('/');
            },
        }),
    );

    server.use(verifyRequest());
    server.use(async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    });

    server.listen(port, () => {
        if (dev) {
            console.log(`> [INFO] API Secret: ${SHOPIFY_API_SECRET_KEY}`);
            console.log(`> [INFO] API Key: ${SHOPIFY_API_KEY}`);
        }
        console.log(`> [SERVER] Listening on http://localhost:${port}`);
    });
});

require('isomorphic-fetch');
const dotenv = require('dotenv');
dotenv.config();

const next = require('next');
const Koa = require('koa');
const session = require('koa-session');
const logger = require('koa-logger');
// const bodyParser = require('koa-bodyparser');

const Router = require('koa-router');
const dataRouter = require('./server/routes/data')(Router);

// environment variables
const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    server.use(logger());
    server.use(session({ sameSite: 'none', secure: true }, server));

    // data routes
    server.use(dataRouter.routes());
    server.use(dataRouter.allowedMethods());

    router.get('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    });
    server.use(router.allowedMethods());
    server.use(router.routes());

    server.listen(port, () => {
        if (dev) {
            console.log(`> [INFO] DEV API STARTED`);
        }
        console.log(`> [SERVER] Listening on http://localhost:${port}`);
    });
});

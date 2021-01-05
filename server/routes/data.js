const { doTypesOverlap } = require('graphql');
const firestore = require('../platform/firestore.js');
const { docs } = require('../utils/firestore-utils')();

module.exports = (Router) => {
    const router = new Router({ prefix: '/data' });

    // pull the comments
    router.get('/comments', async (ctx) => {
        try {
            const { admin, error } = firestore();

            ctx.body = '';
            if (!admin) {
                console.log(
                    '> [ERR] Error encountered while registering or interacting with firestore client: ',
                    error,
                );
                ctx.statusCode = 503;
            } else {
                const db = admin.firestore();
                const queryComments = db.collection('comments').limit(10);

                await queryComments
                    .get()
                    .then((snapshot) => {
                        if (snapshot.empty) {
                            console.log(`> [INF] No comment documents`);
                        }

                        let comments = [];
                        snapshot.forEach((doc) => {
                            const id = doc.id;
                            const c = {
                                id,
                                ...doc.data(),
                            };
                            comments.push(c);
                        });
                        console.log(
                            `> [INF] Comment documents data list: found(${comments.length})`,
                        );
                        ctx.body = {
                            comments,
                        };
                    })
                    .catch((err) => {
                        console.log('[ERR] Error getting comment documents', err);
                    });

                ctx.statusCode = 200;
            }
        } catch (err) {
            ctx.statusCode = 500;
            ctx.body = JSON.stringify({ error: err });
        }
    });

    return router;
};

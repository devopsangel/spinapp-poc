const firestore = require('../platform/firestore.js');
const { docs } = require('../utils/firestore-utils')();

module.exports = (Router) => {
    const router = new Router({ prefix: '/data' });

    // pull the comments
    router.get('/comments', async (ctx) => {
        try {
            const { admin, error } = firestore();
            const db = admin.firestore();
            const commentsRef = db.collection('comments').doc();

            ctx.body = '';
            if (!admin) {
                console.log(
                    '> [ERR] Error encountered while registering or interacting with firestore client: ',
                    error,
                );
                ctx.statusCode = 503;
            } else {
                const queryComments = commentsRef.limit(10);

                await queryComments
                    .get()
                    .then((snapshot) => {
                        if (snapshot.empty) {
                            console.log(`> [INF] No matching documents`);
                        }

                        let comments = [];
                        snapshot.forEach((doc) => {
                            comments.push(doc.data());
                        });
                        console.log(
                            `> [INF] Comment documents list data: found(${comments.length})`,
                        );
                        ctx.body = {
                            comments: [...comments],
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

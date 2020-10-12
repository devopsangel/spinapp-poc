const qs = require('qs');
const firestore = require('../platform/firestore.js');
const getBulkProducts = require('../utils/getbulk-products');
const { docs } = require('../utils/firestore-utils')();

module.exports = (Router) => {
    const router = new Router({ prefix: '/data' });

    // get shops info
    router.get('/shop', async (ctx) => {
        try {
            const {
                session: { shop },
            } = ctx;

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
                const docRef = db.collection('turtleShops').doc(shop.split('.')[0]);
                await docRef
                    .get()
                    .then((doc) => {
                        if (!doc.exists) {
                            console.log(`> [ERR] No such document <${shop}>`);
                        } else {
                            // const docData = JSON.stringify(doc.data());
                            const { billingEnabled, bulkOperations, plan } = doc.data();
                            const planData = JSON.stringify(plan);
                            console.log(
                                `> [INF] Document data for store <${shop}>: (BillingEnabled: ${billingEnabled}; Plan: ${planData})`,
                                // `> [INF] Document data for store <${shop}>: (${docData})`,
                            );
                            ctx.body = {
                                billingEnabled,
                                loadCompleted: bulkOperations.completed,
                                partnerDevelopment: plan.partnerDevelopment,
                            };
                        }
                    })
                    .catch((err) => {
                        console.log('[ERR] Error getting document', err);
                    });
                ctx.statusCode = 200;
            }
        } catch (err) {
            ctx.statusCode = 500;
            ctx.body = JSON.stringify({ error: err });
        }
    });

    // filters
    router.get('/filters', async (ctx) => {
        try {
            const {
                session: { shop },
            } = ctx;

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
                const docRef = db.collection('turtleProducts').doc(shop.split('.')[0]);
                await docRef
                    .get()
                    .then((doc) => {
                        if (!doc.exists) {
                            console.log(`> [ERR] No such document <${shop}>`);
                        } else {
                            const docData = JSON.stringify(doc.data());
                            console.log(
                                `> [INF] Document data for store <${shop}>: (${docData})`,
                            );
                            const {
                                collections,
                                productTypes,
                                tags,
                                vendors,
                            } = doc.data();
                            ctx.body = {
                                collections,
                                productTypes,
                                tags,
                                vendors,
                            };
                        }
                    })
                    .catch((err) => {
                        console.log('[ERR] Error getting document', err);
                    });
                ctx.statusCode = 200;
            }
        } catch (err) {
            ctx.statusCode = 500;
            ctx.body = JSON.stringify({ error: err });
        }
    });

    // settings
    router.get('/settings', async (ctx) => {
        try {
            const {
                session: { shop },
            } = ctx;

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
                const docRef = db.collection('turtleProducts').doc(shop.split('.')[0]);
                await docRef
                    .get()
                    .then((doc) => {
                        if (!doc.exists) {
                            console.log(`> [ERR] No such document <${shop}>`);
                        } else {
                            const docData = JSON.stringify(doc.data());
                            console.log(
                                `> [INF] Document data for store <${shop}>: (${docData})`,
                            );
                            const { settings } = doc.data();
                            ctx.body = {
                                settings,
                            };
                        }
                    })
                    .catch((err) => {
                        console.log('[ERR] Error getting document', err);
                    });
                ctx.statusCode = 200;
            }
        } catch (err) {
            ctx.statusCode = 500;
            ctx.body = JSON.stringify({ error: err });
        }
    });

    // setting delete tag
    router.put('/settings/delete/tag', async (ctx) => {
        try {
            const {
                session: { shop },
                request,
            } = ctx;

            const tag = qs.parse(request.query);
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
                const docRef = db.collection('turtleProducts').doc(shop.split('.')[0]);
                await docRef
                    .update({
                        settings: admin.firestore.FieldValue.arrayRemove(tag.name),
                    })
                    .then((res) => {
                        console.log(
                            `> [INF] Document updated tag list for store <${shop}>: (${JSON.stringify(
                                res,
                            )})`,
                        );
                    })
                    .catch((err) => {
                        console.log('[ERR] Error updating tag to document', err);
                    });
                ctx.statusCode = 200;
            }
        } catch (err) {
            ctx.statusCode = 500;
            ctx.body = JSON.stringify({ error: err });
        }
    });

    // setting add tag
    router.put('/settings/add/tag', async (ctx) => {
        try {
            const {
                session: { shop },
                request,
            } = ctx;

            const tag = qs.parse(request.query);
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
                const docRef = db.collection('turtleProducts').doc(shop.split('.')[0]);
                await docRef
                    .update({
                        settings: admin.firestore.FieldValue.arrayUnion(tag.name),
                    })
                    .then((res) => {
                        console.log(
                            `> [INF] Document added tag for store <${shop}>: (${JSON.stringify(
                                res,
                            )})`,
                        );
                    })
                    .catch((err) => {
                        console.log('[ERR] Error adding tag to document', err);
                    });
                ctx.statusCode = 200;
            }
        } catch (err) {
            ctx.statusCode = 500;
            ctx.body = JSON.stringify({ error: err });
        }
    });

    // get reload info
    router.get('/reload', async (ctx) => {
        try {
            const {
                session: { shop },
            } = ctx;

            const { admin, error } = firestore();
            ctx.body = '';
            if (!admin) {
                console.log(
                    '> [ERR] Error encountered while registering or interacting with firestore client: ',
                    error,
                );
                ctx.statusCode = 503;
            } else {
                // Pull accessToken
                const token = await docs.getData({
                    collection: 'turtleShops',
                    id: shop.split('.')[0],
                });

                // bulk operation request
                const bulkOpsProductID = await getBulkProducts(token.accessToken, shop);
                console.log(
                    `> [INFO] BulkOperation -- <${bulkOpsProductID}> added (firestore)`,
                );

                // reset for reload
                const db = admin.firestore();
                const docRef = db.collection('turtleShops').doc(shop.split('.')[0]);
                await docRef
                    .update({
                        bulkOperations: {
                            completed: false,
                            orderLoad: '',
                            orderLoadID: '',
                            productLoad: '',
                            productLoadID: bulkOpsProductID,
                        },
                    })
                    .then((res) => {
                        console.log(
                            `> [INF] Document updated shop bulkOperations for store <${shop}>: (${JSON.stringify(
                                res,
                            )})`,
                        );
                    })
                    .catch((err) => {
                        console.log('[ERR] Error updating document', err);
                    });
                ctx.statusCode = 200;
            }
        } catch (err) {
            ctx.statusCode = 500;
            ctx.body = JSON.stringify({ error: err });
        }
    });

    // pull the products
    router.get('/products', async (ctx) => {
        try {
            const {
                session: { shop },
                request,
            } = ctx;

            const filter = qs.parse(request.query);
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
                const variantsRef = db
                    .collection('turtleProducts')
                    .doc(shop.split('.')[0])
                    .collection('variants');

                if (filter.name === 'age') {
                    await variantsRef
                        .where(filter.name, '>=', filter.from)
                        .where(filter.name, '<', filter.to)
                        .orderBy('age', 'desc')
                        .limit(50)
                        .get()
                        .then((snapshot) => {
                            if (snapshot.empty) {
                                console.log(`> [INF] No matching documents <${shop}>`);
                            }

                            let productList = [];
                            snapshot.forEach((doc) => {
                                productList.push(doc.data());
                            });
                            console.log(
                                `> [INF] Product documents list data for store <${shop}>: found(${productList.length})`,
                            );
                            ctx.body = {
                                productList,
                            };
                        })
                        .catch((err) => {
                            console.log('[ERR] Error getting product documents', err);
                        });
                } else if (filter.name === 'none') {
                    await variantsRef
                        .where('age', '>=', 0)
                        .orderBy('age', 'desc')
                        .limit(50)
                        .get()
                        .then((snapshot) => {
                            if (snapshot.empty) {
                                console.log(`> [INF] No matching documents <${shop}>`);
                            }

                            let productList = [];
                            snapshot.forEach((doc) => {
                                productList.push(doc.data());
                            });
                            console.log(
                                `> [INF] Product documents list data for store <${shop}>: found(${productList.length})`,
                            );
                            ctx.body = {
                                productList,
                            };
                        })
                        .catch((err) => {
                            console.log('[ERR] Error getting product documents', err);
                        });
                } else if (filter.name === 'collections' || filter.name === 'tags') {
                    await variantsRef
                        .where(filter.name, 'array-contains', filter.value)
                        .orderBy('updatedAt', 'desc')
                        .limit(50)
                        .get()
                        .then((snapshot) => {
                            if (snapshot.empty) {
                                console.log(`> [INF] No matching documents <${shop}>`);
                            }

                            let productList = [];
                            snapshot.forEach((doc) => {
                                productList.push(doc.data());
                            });
                            console.log(
                                `> [INF] Product documents list data for store <${shop}>: found(${productList.length})`,
                            );
                            ctx.body = {
                                productList,
                            };
                        })
                        .catch((err) => {
                            console.log('[ERR] Error getting product documents', err);
                        });
                } else {
                    await variantsRef
                        .where(filter.name, '==', filter.value)
                        .orderBy('updatedAt', 'desc')
                        .limit(50)
                        .get()
                        .then((snapshot) => {
                            if (snapshot.empty) {
                                console.log(`> [INF] No matching documents <${shop}>`);
                            }

                            let productList = [];
                            snapshot.forEach((doc) => {
                                productList.push(doc.data());
                            });
                            console.log(
                                `> [INF] Product documents list data for store <${shop}>: found(${productList.length})`,
                            );
                            ctx.body = {
                                productList,
                            };
                        })
                        .catch((err) => {
                            console.log('[ERR] Error getting product documents', err);
                        });
                }

                ctx.statusCode = 200;
            }
        } catch (err) {
            ctx.statusCode = 500;
            ctx.body = JSON.stringify({ error: err });
        }
    });

    return router;
};

const moment = require('moment');
const firestore = require('../platform/firestore.js');
const webhooks = require('./webhooks.js')();
const getBulkProducts = require('./getbulk-products.js');
const getShopInfo = require('./getshop-info.js');

module.exports = async ({ accessToken, shop }) => {
    try {
        const { APP_WEBHOOKS_TOPICS } = process.env;
        const { admin, error } = firestore();

        if (!admin) {
            console.log(
                '> [ERR] Error encountered while registering or interacting with firestore client: ',
                error,
            );
            return { status: 500 };
        } else {
            const db = admin.firestore();
            const shopRef = db.collection('turtleShops').doc(shop.split('.')[0]);

            // make sure shop doesn't exist to avoid dupes
            const installStatus = await shopRef
                .get()
                .then(async (doc) => {
                    if (doc.exists) {
                        console.log(
                            `> [WARN] Install -- shop already exists <${shop}> (firestore)`,
                        );
                        return { status: 200 };
                    } else {
                        const registeredPromises = APP_WEBHOOKS_TOPICS.split(',').map(
                            async (topic) => {
                                try {
                                    const updateResponse = await webhooks.register({
                                        accessToken,
                                        shop,
                                        topic,
                                    });

                                    if (updateResponse.success) {
                                        return topic;
                                    }
                                } catch (err) {
                                    console.log(
                                        `> [ERR] Error encountered while setting webhook <${topic}> `,
                                        err,
                                    );
                                }
                            },
                        );

                        // bulk operation request
                        const bulkOpsProductID = await getBulkProducts(accessToken, shop);
                        console.log(
                            `> [INFO] BulkOperation -- <${bulkOpsProductID}> added (firestore)`,
                        );

                        // get shop info
                        const shopInfo = await getShopInfo(accessToken, shop);
                        const registeredHooks = await Promise.all(registeredPromises);
                        await shopRef.set({
                            accessToken,
                            shop,
                            ...shopInfo,
                            installed: true,
                            dateInstalled: moment().format(),
                            bulkOperations: {
                                completed: false,
                                productLoadID: bulkOpsProductID,
                                productLoad: '',
                                orderLoadID: '',
                                orderLoad: '',
                            },
                            webhooks: registeredHooks,
                        });
                        console.log(
                            `> [INFO] Install -- shop added to firestore <${shop}> (firestore)`,
                        );

                        return { status: 201 };
                    }
                })
                .catch((err) => {
                    console.log(`> [ERR] Error installing  <${shop}> `, err);
                });

            return installStatus;
        }
    } catch (err) {
        console.log('> [ERR] Error encountered while installing app: ', err);
        return { status: 500 };
    }
};

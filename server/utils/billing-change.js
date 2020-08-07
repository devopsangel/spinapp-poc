const firestore = require('../platform/firestore.js');

module.exports = () => {
    const activate = async ({ accessToken, shop }) => {
        try {
            const { admin, error } = firestore();

            if (!admin) {
                console.log(
                    '> [ERR] Error encountered while registering or interacting with firestore client: ',
                    error,
                );
            } else {
                const db = admin.firestore();
                const shopRef = db.collection('turtleShops').doc(shop.split('.')[0]);

                //	make sure shop doesn't exist to avoid dupes
                await shopRef
                    .get()
                    .then((doc) => {
                        if (!doc.exists) {
                            console.log(
                                `> [WARN] Install -- shop does not exist, cannot activate billing <${shop}> (firestore)`,
                            );
                        } else {
                            console.log(
                                `> [INFO] Install -- shop billing set to enabled <${shop}> (firestore)`,
                            );
                            shopRef.update({ billingEnabled: true });
                        }
                    })
                    .catch((err) => {
                        console.log(
                            `> [ERR] Error getting document <${shop}> (firestore)`,
                            err,
                        );
                    });
            }
        } catch (err) {
            console.log('> [ERR] Error encountered while activating shop billing: ', err);
        }
    };

    return {
        activate,
    };
};

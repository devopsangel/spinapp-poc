const firestore = require('../firestore.js');

module.exports = () => {
    const appUninstall = async ({ shop }) => {
        try {
            const { admin, error } = firestore();

            if (!admin) {
                console.log(
                    '> [ERR] Error encountered while registering or interacting with firestore client: ',
                    error,
                );
            } else {
                const db = admin.firestore();
                const shopRef = db.collection('turtle_shops').doc(shop.split('.')[0]);

                //	make sure shop doesn't exist to avoid dupes
                await shopRef.update({ installed: false, billingEnabled: false });
                console.log(`> [INFO] Uninstall -- shop <${shop}> (firestore)`);
            }
        } catch (err) {
            console.log(
                `> [ERR] Error encountered while uninstalling shop <${shop}> (firestore): `,
                err,
            );
        }
    };

    return {
        appUninstall,
    };
};
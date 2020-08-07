const firestore = require('../platform/firestore.js');

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
                const shopRef = db.collection('turtleShops').doc(shop.split('.')[0]);

                //	make sure shop doesn't exist to avoid dupes
                // await shopRef.update({ installed: false, billingEnabled: false });
                await shopRef.delete();
                console.log(`> [INFO] App uninstall -- shop <${shop}> (firestore)`);
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

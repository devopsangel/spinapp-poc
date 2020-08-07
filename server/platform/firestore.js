const admin = require('firebase-admin');

module.exports = () => {
    try {
        if (!admin.apps.length) {
            const { FIREBASE_DATABASE_URL } = process.env;

            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
                databaseURL: FIREBASE_DATABASE_URL,
            });
        }

        return { admin };
    } catch (err) {
        console.log('> [ERR] Firestore initialization failed: ', err);
        return { admin, error: err };
    }
};

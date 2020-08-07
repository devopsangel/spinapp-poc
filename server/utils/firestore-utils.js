const firebase = require('../platform/firestore');

module.exports = () => {
    const { admin, error } = firebase();

    const docExists = async ({ collection, id }) => {
        if (!error) {
            const db = admin.firestore();
            const docRef = await db.collection(collection).doc(id);
            const docSnapshot = await docRef.get();
            return docSnapshot && docSnapshot.exists;
        }
        return false;
    };
    const addDoc = async ({
        collection,
        id,
        data,
        options: { merge } = { merge: false },
    }) => {
        if (!error) {
            const db = admin.firestore();
            return await db.collection(collection).doc(id).set(data, { merge });
        }
        return undefined;
    };
    const getDocData = async ({ collection, id }) => {
        if (!error) {
            const db = admin.firestore();
            const docRef = await db.collection(collection).doc(id);
            const docSnapshot = await docRef.get();

            if (docSnapshot && docSnapshot.exists) {
                return docSnapshot.data();
            }
        }
        return undefined;
    };
    const getDocsBy = async ({ collection, where }) => {
        if (!error) {
            const db = admin.firestore();
            const query = await db.collection(collection).where(where);
            return query.docs;
        }
        return undefined;
    };
    const updateDoc = async ({ collection, id, data }) => {
        if (!error) {
            const db = admin.firestore();
            const docRef = await db.collection(collection).doc(id);
            const docSnapshot = await docRef.get();

            if (docSnapshot && docSnapshot.exists) {
                docRef.update(data);
            }
        }
        return undefined;
    };
    const removeDoc = async ({ collection, id }) => {
        if (!error) {
            const db = admin.firestore();
            const docRef = await db.collection(collection).doc(id);
            const docSnapshot = await docRef.get();
            if (docSnapshot && docSnapshot.exists) return await docRef.delete();
        }
        return undefined;
    };

    return {
        docs: {
            exists: docExists,
            add: addDoc,
            getData: getDocData,
            getBy: getDocsBy,
            update: updateDoc,
            remove: removeDoc,
        },
    };
};

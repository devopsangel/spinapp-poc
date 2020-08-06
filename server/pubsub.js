const { PubSub } = require('@google-cloud/pubsub');

const { FIREBASE_PROJECT_ID } = process.env;

// Instantiates a client
const pubsubClient = new PubSub({
    projectId: FIREBASE_PROJECT_ID,
});

module.exports = pubsubClient;

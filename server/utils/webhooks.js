const { registerWebhook } = require('@shopify/koa-shopify-webhooks');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const { APP_HOST } = process.env;

module.exports = () => {
    const register = async ({ accessToken, shop, topic }) => {
        const topicName = topic.toUpperCase().replace('/', '_');
        const registration = await registerWebhook({
            address: `${APP_HOST}/webhooks/${topic}`,
            topic: topicName,
            format: 'json',
            accessToken,
            shop,
            apiVersion: ApiVersion.October19,
        });

        if (registration.success) {
            console.log('> [INFO] Successfully registered webhook!', topic);
        } else {
            console.log('> [ERR] Failed to register webhook', registration.result);
        }

        return registration;
    };

    return {
        register,
    };
};

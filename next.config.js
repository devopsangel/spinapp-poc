require('dotenv').config();
const webpack = require('webpack');

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const appHost = JSON.stringify(process.env.APP_HOST);

module.exports = {
    devIndicators: {
        autoPrerender: false,
    },
    webpack: (config) => {
        const env = { API_KEY: apiKey, APP_HOST: appHost };
        config.plugins.push(new webpack.DefinePlugin(env));

        return config;
    },
};

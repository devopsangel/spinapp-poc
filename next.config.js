require('dotenv').config();
const webpack = require('webpack');

const appHost = JSON.stringify(process.env.APP_HOST);

module.exports = {
    devIndicators: {
        autoPrerender: false,
    },
    webpack: (config) => {
        const env = { APP_HOST: appHost };
        config.plugins.push(new webpack.DefinePlugin(env));

        return config;
    },
};

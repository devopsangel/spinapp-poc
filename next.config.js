require('dotenv').config();
const webpack = require('webpack');

// const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = {
    webpack: (config) => {
        // const env = { API_KEY: apiKey };
        // config.plugins.push(new webpack.DefinePlugin(env));
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.API_KEY': JSON.stringify(process.env.SHOPIFY_API_KEY),
            }),
        );
        return config;
    },
};

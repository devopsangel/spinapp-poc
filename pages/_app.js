import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from 'js-cookie';
import translations from '@shopify/polaris/locales/en.json';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '@shopify/polaris/dist/styles.css';

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include',
    },
});
const apiKey = process.env.REACT_APP_API_KEY;

class ZooApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        const config = {
            apiKey,
            shopOrigin: Cookies.get('shopOrigin'),
            forceRedirect: true,
        };

        return (
            <React.Fragment>
                <Head>
                    <title>Inventory Aging</title>
                    <meta charSet='utf-8' />
                </Head>
                <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <ApolloProvider client={client}>
                            <Component {...pageProps} />
                        </ApolloProvider>
                    </AppProvider>
                </Provider>
            </React.Fragment>
        );
    }
}

export default ZooApp;

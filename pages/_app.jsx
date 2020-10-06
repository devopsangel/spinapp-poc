import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from 'js-cookie';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { RecoilRoot } from 'recoil';

import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';

// import { getSessionToken } from '@shopify/app-bridge-utils';

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include',
    },
});

class ZooApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        const config = {
            apiKey: API_KEY,
            shopOrigin: Cookies.get('shopOrigin'),
            forceRedirect: true,
        };

        return (
            <React.StrictMode>
                <Head>
                    <title>Inventory Aging</title>
                    <meta charSet='utf-8' />
                </Head>
                <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <ApolloProvider client={client}>
                            <RecoilRoot>
                                <Component {...pageProps} />
                            </RecoilRoot>
                        </ApolloProvider>
                    </AppProvider>
                </Provider>
            </React.StrictMode>
        );
    }
}

export default ZooApp;
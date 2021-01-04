import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';

import { RecoilRoot } from 'recoil';

class MyApp extends App {
    render () {
        return (
            <React.Fragment>
                <Head>
                    <title>Spin App</title>
                    <meta charSet='utf-8' />
                </Head>
                    <AppProvider i18n={translations}>
                        <RecoilRoot>
                            <Component {...pageProps} />
                        </RecoilRoot>
                    </AppProvider>
            </React.Fragment>
        );
    }
}

export default MyApp;

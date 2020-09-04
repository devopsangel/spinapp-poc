import React, { Component } from 'react';
import { Layout, Page } from '@shopify/polaris';

import LoadingStoreData from '../components/loadingstoredata';

class Home extends Component {
    render() {
        return (
            <Page>
                <Layout>
                    <LoadingStoreData />
                </Layout>
            </Page>
        );
    }
}

export default Home;

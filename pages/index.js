import React, { Component } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';

class Index extends Component {
    render() {
        return (
            <Page>
                <Layout>
                    <EmptyState
                        heading='Poka ne ponyatno'
                        action={{
                            content: 'Testing',
                        }}
                        image='https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'
                    >
                        <p>Testing new app structure</p>
                    </EmptyState>
                </Layout>
            </Page>
        );
    }
}

export default Index;

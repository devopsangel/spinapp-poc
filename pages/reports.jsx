import React from 'react';
import {
    Page,
    Layout,
} from '@shopify/polaris';

import ChartCard from '../components/ChartCard';

const Reports = () => {
    return (
        <React.Fragment>
            <Page fullWidth={true}>
                <Layout>
                    <Layout.Section oneThird>
                        <ChartCard />
                    </Layout.Section>
                    <Layout.Section oneThird>
                        <ChartCard />
                    </Layout.Section>
                    <Layout.Section oneThird>
                        <ChartCard />
                    </Layout.Section>
                </Layout>
            </Page>
        </React.Fragment>
    );
};

export default Reports;

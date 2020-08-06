import React from 'react';
import { Page, Card, TextStyle, Layout, FooterHelp, Link } from '@shopify/polaris';

const BlockedStore = () => (
    <Page separator>
        <div style={{ height: '100px' }} />

        <Layout>
            <Layout.Section>
                <Card>
                    <div style={{ display: 'flex' }}>
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'left',
                                padding: '20px',
                                textAlign: 'left',
                            }}
                        >
                            <div style={{ paddingTop: '40px' }}>
                                <TextStyle variation='strong'>
                                    Oops, one moment!
                                </TextStyle>
                            </div>
                            <br />
                            <br />
                            <p>
                                The operation could not be completed because of a
                                restriction in your current plan.
                                <br />
                                Your plan doesn't allow Shopify App Store purchases. You
                                can upgrade your plan in your Shopify settings.
                                <br />
                                <br />
                                <TextStyle variation='strong'>
                                    We hope to see you soon!
                                </TextStyle>
                            </p>
                        </div>
                        <img
                            style={{
                                width: '300px',
                                height: '300px',
                                marginBottom: '-5px',
                            }}
                            src='/assets/images/fakeStore.svg'
                            alt='Fake Store'
                        />
                    </div>
                </Card>
            </Layout.Section>
            <Layout.Section>
                <FooterHelp>
                    Learn more about{' '}
                    <Link url='https://wwww.zoocommerce.co/turtle'>inventory aging</Link>.
                </FooterHelp>
            </Layout.Section>
        </Layout>
    </Page>
);

export default BlockedStore;

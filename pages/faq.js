import React from 'react';
import { Card, Layout, TextContainer, Heading, Link, Page } from '@shopify/polaris';

const FAQ = () => {
    return (
        <React.Fragment>
            <Page>
                <Card title='FAQ Page:' sectioned>
                    <Layout>
                        <Layout.Section>
                            <TextContainer>
                                <Heading>How does Aged Products work?</Heading>
                                <p>
                                    Data get analized accross all store orders and it will
                                    track any changes on the products.
                                </p>
                            </TextContainer>
                        </Layout.Section>
                        <Layout.Section>
                            <TextContainer>
                                <Heading>
                                    What time zone is used for time based Inventory age
                                    updates?
                                </Heading>
                                <p>
                                    It is based on the local time zone of the place where
                                    your store exist. .
                                </p>
                            </TextContainer>
                        </Layout.Section>
                        <Layout.Section>
                            <TextContainer>
                                <Heading>What is your Privacy Policy?</Heading>
                                <p>
                                    Please find our Privacy Policy at{' '}
                                    <Link
                                        url='https://www.zoocommerce.co/privacy'
                                        external={true}
                                    >
                                        zoocommerce.co/privacy
                                    </Link>
                                    .
                                </p>
                            </TextContainer>
                        </Layout.Section>
                    </Layout>
                </Card>
            </Page>
        </React.Fragment>
    );
};

export default FAQ;

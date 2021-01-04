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
                                <Heading>How does Spin App work?</Heading>
                                <p>
                                    Nullam efficitur eget nibh in suscipit. Sed faucibus sodales dapibus. Vivamus fermentum ante at
                                    nulla maximus lacinia in quis est. Nunc faucibus mattis molestie. Proin rutrum facilisis mauris
                                    nec varius. Aliquam tincidunt leo eros, nec dapibus felis congue eget. Nulla consectetur, purus
                                    imperdiet ultrices egestas, leo urna mattis leo, rhoncus ultrices leo ligula eu elit. Suspendisse
                                    nec tempor quam. Duis fringilla nisl non massa laoreet congue. Pellentesque suscipit leo eu auctor
                                    accumsan. Vestibulum egestas diam nisl, ut mollis elit fermentum sed. In hac habitasse platea
                                    dictumst. Praesent vestibulum metus vestibulum, placerat nulla vel, placerat sem.
                                </p>
                            </TextContainer>
                        </Layout.Section>
                        <Layout.Section>
                            <TextContainer>
                                <Heading>
                                    How Spin App using your data?
                                </Heading>
                                <p>
                                    Nullam efficitur eget nibh in suscipit. Sed faucibus sodales dapibus. Vivamus fermentum ante at
                                    nulla maximus lacinia in quis est. Nunc faucibus mattis molestie. Proin rutrum facilisis mauris
                                    nec varius. Aliquam tincidunt leo eros, nec dapibus felis congue eget. Nulla consectetur, purus
                                    imperdiet ultrices egestas, leo urna mattis leo, rhoncus ultrices leo ligula eu elit. Suspendisse
                                    nec tempor quam. Duis fringilla nisl non massa laoreet congue. Pellentesque suscipit leo eu auctor
                                    accumsan. Vestibulum egestas diam nisl, ut mollis elit fermentum sed. In hac habitasse platea
                                    dictumst. Praesent vestibulum metus vestibulum, placerat nulla vel, placerat sem.
                                </p>
                            </TextContainer>
                        </Layout.Section>
                        <Layout.Section>
                            <TextContainer>
                                <Heading>What is your Privacy Policy?</Heading>
                                <p>
                                    Please find our Privacy Policy at{' '}
                                    <Link
                                        url='https://www.google.com'
                                        external={true}
                                    >
                                        spinapp.co/privacy
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

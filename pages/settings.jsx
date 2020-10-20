import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
    Page,
    Banner,
    Layout,
    FormLayout,
    Card,
    TextField,
    Button,
    Frame,
    Loading,
    SkeletonBodyText,
    SkeletonDisplayText,
} from '@shopify/polaris';
// import SettingsLoading from '../components/SettingsLoading';
// import TagList from '../components/TagList';

import {
    shopState,
    meerkatInfoState,
} from '../store';

const Settings = () => {
    // get values
    const meerkatInfo = useRecoilValue(meerkatInfoState);
    const turtleInfo = useRecoilValue(shopState);

    // const handleTaggedWithChange = useCallback((value) => {
    //     setTaggedWith(value);
    //     setAddButtonDisabled(false);
    //     // eslint-disable-next-line
    // }, []);

    // const handleTagOnClick = useCallback((value) => {
    //     addTagSettings(dispatch, `name=${value}`);
    //     setTaggedWith('');
    //     // eslint-disable-next-line
    // }, []);

    const handleReloadOnClick = useCallback(() => {
        console.log('Reset data');
    }, []);

    return (
        <React.Fragment>
            <Page fullWidth={false}>
                <div style={{ height: '20px' }} />
                <Layout>
                    {!meerkatInfo.billingEnabled || !meerkatInfo.installed ? (
                    <Layout.Section>
                        <Banner
                            title='Learn more about Discount Scheduler App - Meerkat'
                            action={{
                                content: 'Discount Scheduler',
                                external: true,
                                url: 'https://apps.shopify.com',
                            }}
                            status='info'
                            // onDismiss={() => {}}
                        >
                            <p>
                                Got inventory that needs to move out? Add Meerkat app to
                                automatically schedule sale and announce to you Social
                                channels!
                            </p>
                        </Banner>
                    </Layout.Section>
                    ) : '' }
                    {/* <Layout.AnnotatedSection
                        title='Ignore products'
                        description='List of tags that applied to products that needs to be ignored.'
                    >
                        <Card sectioned>
                            <FormLayout>
                                <FormLayout.Group>
                                    <TextField
                                        label='Tag name'
                                        value={taggedWith}
                                        onChange={handleTaggedWithChange}
                                        connectedRight={
                                            <Button
                                                primary
                                                disabled={addButtonDisabled}
                                                onClick={() =>
                                                    handleTagOnClick(taggedWith)
                                                }
                                            >
                                                Add
                                            </Button>
                                        }
                                    />
                                </FormLayout.Group>
                                <FormLayout.Group>
                                    <TagList settings={props.settings} />
                                </FormLayout.Group>
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection> */}
                    <Layout.AnnotatedSection
                        title='Reload aged products'
                        description='By submitting Turtle is going to reload all data '
                    >
                        <Card sectioned>
                            <FormLayout>
                                <FormLayout.Group>
                                    <Button
                                        disabled={!turtleInfo.loadCompleted}
                                        onClick={() => handleReloadOnClick()}
                                    >
                                        Reload aged data
                                    </Button>
                                </FormLayout.Group>
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
            </Page>
        </React.Fragment>
    );
};

export default Settings;

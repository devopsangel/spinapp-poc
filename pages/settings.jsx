import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

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
import SettingsLoading from '../components/SettingsLoading';
// import TagList from '../components/TagList';

import {
    shopState,
    initializingState,
    errorState,
    meerkatInfoState
} from '../store';

const Settings = () => {
    const [shop, setShop] = useRecoilState(shopState);
    const [initializing, setInitializing] = useRecoilState(initializingState);
    const [error, setError] = useRecoilState(errorState);
    const [meerkatInfo, setMeerkatInfo] = useRecoilState(meerkatInfoState);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setInitializing(true);

                await fetch(`${APP_HOST}/data/shop`)
                    .then((resp) => resp.json())
                    .then((data) => setShop(data));

                await fetch(`${APP_HOST}/data/meerkat/info`)
                    .then((resp) => resp.json())
                    .then((data) => setMeerkatInfo(data));
            } catch (e) {
                if (e.response) {
                    setError(
                        e.response.data ? e.response.data : e.response.status + ' Error',
                    );
                } else {
                    setError(e.message);
                }
            } finally {
                setInitializing(false);
            }
        };

        fetchAll();
    }, []);

    const hasAllData = shop && meerkatInfo;

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
                {initializing && (
                    <Layout>
                        <SettingsLoading />
                    </Layout>
                )}
                {!initializing && !error && hasAllData && (
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
                                        disabled={!shop.loadCompleted}
                                        onClick={() => handleReloadOnClick()}
                                    >
                                        Reload aged data
                                    </Button>
                                </FormLayout.Group>
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>
                    </Layout>
                    )}
            </Page>
        </React.Fragment>
    );
};

export default Settings;

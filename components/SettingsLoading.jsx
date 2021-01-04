import React from 'react';
import {
    Layout,
    Card,
    Frame,
    Loading,
    SkeletonBodyText,
    SkeletonDisplayText,
} from '@shopify/polaris';

const SettingsLoading = () => {
    return (
        <React.Fragment>
            <Frame>
                <Loading />
                <div>
                    <Layout.AnnotatedSection
                        title={<SkeletonDisplayText size='small' />}
                        description={<SkeletonBodyText />}
                    >
                        <Card sectioned>
                            <SkeletonBodyText lines={5} />
                        </Card>
                    </Layout.AnnotatedSection>
                    <Layout.AnnotatedSection
                        title={<SkeletonDisplayText size='small' />}
                        description={<SkeletonBodyText />}
                    >
                        <Card sectioned>
                            <SkeletonBodyText lines={5} />
                        </Card>
                    </Layout.AnnotatedSection>
                </div>
            </Frame>
        </React.Fragment>
    );
};

export default SettingsLoading;

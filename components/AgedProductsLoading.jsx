import React from 'react';
import {
    ResourceList,
    Frame,
    Loading,
    SkeletonBodyText,
    SkeletonDisplayText,
} from '@shopify/polaris';

const style = { flex: 2, margin: '0 12px' };

const AgedProductsLoading = () => {
    return (
        <React.Fragment>
            <Frame>
                <Loading />
                <div>
                    <div style={{ margin: '20px' }}>
                        <SkeletonDisplayText />
                        <div style={{ height: '12px' }} />
                        <SkeletonBodyText lines={2} />
                    </div>
                    <hr style={{ margin: '6px 0 0 0', borderColor: '#DFE3E8' }} />
                    <ResourceList
                        items={['', '', '', '', '']}
                        renderItem={() => {
                            return (
                                <ResourceList.Item>
                                    <div style={{ display: 'flex' }}>
                                        <div style={style}>
                                            <SkeletonBodyText lines={1} />
                                        </div>
                                        <div style={{ ...style, flex: 3 }}>
                                            <SkeletonBodyText lines={2} />
                                        </div>
                                        <div style={style}>
                                            <SkeletonBodyText lines={1} />
                                        </div>
                                        <div style={style}>
                                            <SkeletonBodyText lines={1} />
                                        </div>
                                        <div
                                            style={{
                                                flex: 1,
                                                margin: '0',
                                                paddingLeft: '12px',
                                            }}
                                        >
                                            <SkeletonDisplayText />
                                        </div>
                                    </div>
                                </ResourceList.Item>
                            );
                        }}
                    />
                </div>
            </Frame>
        </React.Fragment>
    );
};

export default AgedProductsLoading;

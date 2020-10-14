import React from 'react';

import { TextStyle } from '@shopify/polaris';

const ResourceListHeader = () => {
    const rowStyle = {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        padding: '6px',
    };
    const rowStyleQuantity = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '6px',
    };
    return (
        <React.Fragment>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                <div
                    style={{
                        ...rowStyle,
                        justifyContent: 'left',
                    }}
                >
                <h3>
                    <TextStyle variation="strong">Product Title</TextStyle>
                </h3>
                </div>
                <div
                    style={{
                        ...rowStyleQuantity,
                        justifyContent: 'center',
                    }}
                >
                <h3>
                    <TextStyle variation="strong">Aged Days</TextStyle>
                </h3>
                </div>
                <div
                    style={{
                        ...rowStyleQuantity,
                        justifyContent: 'center',
                    }}
                >
                <h3>
                    <TextStyle variation="strong">Inventory Quantity</TextStyle>
                </h3>
                </div>
                <div
                    style={{
                        ...rowStyleQuantity,
                        justifyContent: 'center',
                    }}
                >
                <h3>
                    <TextStyle variation="strong">Cost</TextStyle>
                </h3>
                </div>
                <div
                    style={{
                        ...rowStyle,
                        justifyContent: 'center',
                    }}
                >
                <h3>
                    <TextStyle variation="strong">Total Value Cost</TextStyle>
                </h3>
                </div>
                <div
                    style={{
                        ...rowStyleQuantity,
                        justifyContent: 'center',
                    }}
                >
                <h3>
                    <TextStyle variation="strong">Price</TextStyle>
                </h3>
                </div>
                <div
                    style={{
                        ...rowStyle,
                        justifyContent: 'center',
                    }}
                >
                <h3>
                    <TextStyle variation="strong">Total Value Price</TextStyle>
                </h3>
                </div>
                <div
                    style={{
                        ...rowStyle,
                        justifyContent: 'center',
                    }}
                >
                <h3>
                    <TextStyle variation="strong">Last Purchase</TextStyle>
                </h3>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ResourceListHeader;

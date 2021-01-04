import React from 'react';
import { Card, TextContainer } from '@shopify/polaris';

const ChartCard = ({ image, name, description, onEdit, onInvoice }) => {
    return (
        <Card
            title={name}
            actions={[
                {
                    content: 'Invoice',
                    onAction: onInvoice
                },
                {
                    content: 'Edit',
                    onAction: onEdit
                }
            ]}
        >
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '100px',
                        padding: '1.6rem'
                    }}
                >
                    <img alt='consigner' src={image} width='100%' />
                </div>
                <div style={{ flex: 1, padding: '1.6rem' }}>
                    <TextContainer>
                        <p
                            style={{
                                height: '80px',
                                maxHeight: '80px',
                                overflowX: 'auto'
                            }}
                        >
                            {description}
                        </p>
                    </TextContainer>
                </div>
            </div>
        </Card>
    );
};

export default ChartCard;
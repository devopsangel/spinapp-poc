import React from 'react';
import {
    Card,
    TextContainer
} from '@shopify/polaris';

const CommentCard = ({ image, name, description, onEdit, onDelete }) => {
    return (
        <Card
            title={name}
            actions={[
                {
                    content: 'Delete',
                    onAction: onDelete
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
                    <img alt='spinapp' src={image} width='100%' />
                </div>
                <div style={{ flex: 1, padding: '1.6rem' }}>
                    <TextContainer>
                        <p
                            style={{
                                height: '200px',
                                maxHeight: '200px',
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

export default CommentCard;
import React, { useCallback } from 'react';

import { Tag, Stack } from '@shopify/polaris';
import { useAgeDispatch } from '../state';
import { deleteTagSettings } from '../data';

const TagList = (props) => {
    const dispatch = useAgeDispatch();

    const handleOnRemove = useCallback((tag) => {
        deleteTagSettings(dispatch, `name=${tag}`);
        // eslint-disable-next-line
    }, []);

    const settings = props.settings;
    if (settings) {
        const tagList = settings.map((tag) => {
            return (
                <Tag key={tag} onRemove={() => handleOnRemove(tag)}>
                    {tag}
                </Tag>
            );
        });

        return <Stack spacing='tight'>{tagList}</Stack>;
    } else {
        return <Stack spacing='tight'></Stack>;
    }
};

export default TagList;

import React from 'react';

import { Select } from '@shopify/polaris';

const Filter = (props) => {
    let options = props.list
        .filter((v) => {
            if (v === '') {
                return false;
            }
            return true;
        })
        .map((v) => ({ label: v, value: v }));

    return (
        <Select
            label=''
            options={[
                { label: 'Select a filter...', value: 'Select a filter...' },
                ...options,
            ]}
            onChange={props.onChange}
            value={props.value}
            disabled={props.disabled}
        />
    );
};

export default Filter;

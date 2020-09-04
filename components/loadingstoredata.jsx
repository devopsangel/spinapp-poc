import React from 'react';

import { EmptyState } from '@shopify/polaris';

const LoadingStoreData = () => {
    return (
        <React.Fragment>
            <EmptyState heading='I am working very hard!' image='/loadingstore.gif'>
                <p>
                    Please standby, I will send you email when I am done building aged
                    products view.
                </p>
            </EmptyState>
        </React.Fragment>
    );
};

export default LoadingStoreData;

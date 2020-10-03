import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { Layout, Page } from '@shopify/polaris';
import { shopState } from '../shared/global-state';

import LoadingStoreData from '../components/loadingstoredata';

const Home = () => {
    const [shop, setShop] = useRecoilState(shopState);

    useEffect(() => {
        const getShop = async () => {
            const resp = await fetch(`${APP_HOST}/data/shop`);
            const body = await resp.json();
            setShop(body);
        };

        getShop();
    }, [setShop]);

    return (
        <Page>
            <Layout>
                <LoadingStoreData />
            </Layout>
        </Page>
    );
};

export default Home;

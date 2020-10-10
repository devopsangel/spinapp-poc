import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Layout, Page, Loading, Frame } from '@shopify/polaris';
import { shopState, initializingState, errorState } from '../store';

//components
import BlockedStore from '../components/BlockedStore';
import LoadingStoreData from '../components/LoadingStoreData';
import AgedProducts from '../components/AgedProducts';

const centerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};

const Home = () => {
    const [shop, setShop] = useRecoilState(shopState);
    const [initializing, setInitializing] = useRecoilState(initializingState);
    const [error, setError] = useRecoilState(errorState);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setInitializing(true);

                await fetch(`${APP_HOST}/data/shop`)
                    .then((resp) => resp.json())
                    .then((data) => setShop(data));
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

    const hasAllData = shop;

    return (
        <React.Fragment>
            <Page>
                {initializing && (
                    <Layout>
                        <Frame>
                            <Loading />
                        </Frame>
                    </Layout>
                )}
                {!initializing && error && (
                    <Layout>
                        <div style={centerStyle}>{error} :(...</div>
                    </Layout>
                )}
                {!initializing && !error && hasAllData && (
                    <Layout>
                        {shop.partnerDevelopment ? (
                            <BlockedStore />
                        ) : !shop.loadCompleted ? (
                            <LoadingStoreData />
                        ) : (
                            < AgedProducts />
                        )}
                    </Layout>
                )}
            </Page>
        </React.Fragment>
    );
};

export default Home;

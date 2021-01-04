import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Layout, Page, Loading, Frame } from '@shopify/polaris';
import {
    initializing,
    error,
    commentsState
} from '../store';

//components
// import BlockedStore from '../components/BlockedStore';
// import LoadingStoreData from '../components/LoadingStoreData';
// import AgedProducts from '../components/AgedProducts';

const centerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};

const Home = () => {
    const [comments, setComments] = useRecoilState(commentsState);
    const [initializing, setInitializing] = useRecoilState(initializingState);
    const [error, setError] = useRecoilState(errorState);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setInitializing(true);

                await fetch(`${APP_HOST}/data/comments`)
                    .then((resp) => resp.json())
                    .then((data) => setComments(data));
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

    const hasAllData = comments;

    // checking data
    console.log('Comments: ', comments);

    return (
        <React.Fragment>
            <Page fullWidth={true}>
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

                    </Layout>
                )}
            </Page>
        </React.Fragment>
    );
};

export default Home;

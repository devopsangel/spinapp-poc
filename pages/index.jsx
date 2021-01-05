import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
    Layout,
    Page,
    Loading,
    Frame
} from '@shopify/polaris';
import {
    initializingState,
    errorState,
    commentsState
} from '../store';

//components
import CommentCard from '../components/CommentCard';

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
                    .then((data) => setComments(data.comments));
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

    // Make sure data is fetched
    const hasAllData = comments;

    // checking data
    console.log('[INFO] Fetched comments: ', comments);
    const cards = [];
    comments.forEach((comment = {}) => {
                const { id } = comment;
                cards.push(
                    <Layout.Section key={id} oneThird>
                        <CommentCard
                            {...comment}
                            onEdit={() => {}}
                            onGenerateInvoice={() => {}}
                        />
                    </Layout.Section>
                );
    });

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
                        {cards}
                    </Layout>
                )}
            </Page>
        </React.Fragment>
    );
};

export default Home;

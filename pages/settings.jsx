import React from 'react';

const Settings = () => {
    return <React.Fragment></React.Fragment>;
};

export default Settings;


// import React, { useState, useCallback } from 'react';
// import {
//     Page,
//     Layout,
//     FormLayout,
//     Card,
//     TextField,
//     Button,
//     Frame,
//     Loading,
//     SkeletonBodyText,
//     SkeletonDisplayText,
// } from '@shopify/polaris';
// import TagList from '../components/TagList';

// import { useAgeDispatch } from '../state';
// import { addTagSettings, getReloadData } from '../data';

// const Settings = (props) => {
//     const isLoading = props.shop.loadCompleted;
//     const dispatch = useAgeDispatch();

//     const [addButtonDisabled, setAddButtonDisabled] = useState(true);
//     const [taggedWith, setTaggedWith] = useState();

//     const handleTaggedWithChange = useCallback((value) => {
//         setTaggedWith(value);
//         setAddButtonDisabled(false);
//         // eslint-disable-next-line
//     }, []);

//     const handleTagOnClick = useCallback((value) => {
//         addTagSettings(dispatch, `name=${value}`);
//         setTaggedWith('');
//         // eslint-disable-next-line
//     }, []);

//     const handleReloadOnClick = useCallback(() => {
//         getReloadData(dispatch);
//         // eslint-disable-next-line
//     }, []);

//     if (props.isFetchingSettings) {
//         return (
//             <React.Fragment>
//                 <Frame>
//                     <Loading />
//                     <div>
//                         <Layout.AnnotatedSection
//                             title={<SkeletonDisplayText size='small' />}
//                             description={<SkeletonBodyText />}
//                         >
//                             <Card sectioned>
//                                 <SkeletonBodyText lines={5} />
//                             </Card>
//                         </Layout.AnnotatedSection>
//                         <Layout.AnnotatedSection
//                             title={<SkeletonDisplayText size='small' />}
//                             description={<SkeletonBodyText />}
//                         >
//                             <Card sectioned>
//                                 <SkeletonBodyText lines={5} />
//                             </Card>
//                         </Layout.AnnotatedSection>
//                     </div>
//                 </Frame>
//             </React.Fragment>
//         );
//     }

//     return (
//         <React.Fragment>
//             <Page>
//                 <div style={{ height: '20px' }} />
//                 <Layout>
//                     <Layout.AnnotatedSection
//                         title='Ignore products'
//                         description='List of tags that applied to products that needs to be ignored.'
//                     >
//                         <Card sectioned>
//                             <FormLayout>
//                                 <FormLayout.Group>
//                                     <TextField
//                                         label='Tag name'
//                                         value={taggedWith}
//                                         onChange={handleTaggedWithChange}
//                                         connectedRight={
//                                             <Button
//                                                 primary
//                                                 disabled={addButtonDisabled}
//                                                 onClick={() =>
//                                                     handleTagOnClick(taggedWith)
//                                                 }
//                                             >
//                                                 Add
//                                             </Button>
//                                         }
//                                     />
//                                 </FormLayout.Group>
//                                 <FormLayout.Group>
//                                     <TagList settings={props.settings} />
//                                 </FormLayout.Group>
//                             </FormLayout>
//                         </Card>
//                     </Layout.AnnotatedSection>
//                     <Layout.AnnotatedSection
//                         title='Reload aged products'
//                         description='By submitting Turtle is going to reload all data '
//                     >
//                         <Card sectioned>
//                             <FormLayout>
//                                 <FormLayout.Group>
//                                     <Button
//                                         disabled={!isLoading}
//                                         onClick={() => handleReloadOnClick()}
//                                     >
//                                         Reload aged data
//                                     </Button>
//                                 </FormLayout.Group>
//                             </FormLayout>
//                         </Card>
//                     </Layout.AnnotatedSection>
//                 </Layout>
//             </Page>
//         </React.Fragment>
//     );
// };

// export default Settings;

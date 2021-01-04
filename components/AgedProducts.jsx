import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
import {
    Avatar,
    Card,
    Filters,
    ResourceList,
    ResourceItem,
    TextField,
    FormLayout,
    Button,
    Layout,
    Banner,
    Pagination,
    FooterHelp,
    Link,
    TextStyle,
} from '@shopify/polaris';
import moment from 'moment';
import qs from 'qs';
import abbreviate from 'number-abbreviate';

import Filter from './Filter';
import AgedProductsLoading from './AgedProductsLoading';

import {
    shopState,
    meerkatInfoState,
    fetchingProductState,
    errorFetchingProductState,
    filtersState,
    productsState,
    viewParamsState,
    ageDayDisabledState,
    tagDisabledState,
    vendorDisabledState,
    productTypeDisabledState,
    collectionDisabledState,
    selectedFromState,
    selectedToState,
    selectedVendorState,
    selectedAgeDayState,
    taggedWithState,
    selectedProductTypeState,
    selectedCollectionState,
    queryValueState,
} from '../store';

import { ZooContext } from '../context/global.state';

// const GET_FEATURED_IMAGE = gql`
//     query product($id: ID!) {
//         product(id: $id) {
//             featuredImage {
//             transformedSrc
//             }
//         }
//     }
// `;
// const queryFeaturedImage = (id) => {
//     const { loading, error, data } = useQuery(GET_FEATURED_IMAGE, {
//         variables: { id }
//     });

//     if (loading) return 'http://via.placeholder.com/640x360';
//     if (error) return 'http://via.placeholder.com/640x360';

//     return data.product.featuredImage.transformedSrc;
// }

const AgedProducts = () => {
    const { meerkatInfo } = useContext(ZooContext);

    // Global
    const [isFetchingProducts, setFetchingProducts] = useRecoilState(fetchingProductState);
    const [isErrorFetchingProducts, setErrorFetchingProducts] = useRecoilState(errorFetchingProductState);
    const [filters, setFilters] = useRecoilState(filtersState);
    const [products, setProducts] = useRecoilState(productsState);
    const [viewParams, setViewParams] = useRecoilState(viewParamsState);
    const [ageDayDisabled, setAgeDayDisabled] = useRecoilState(ageDayDisabledState);
    const [tagDisabled, setTagDisabled] = useRecoilState(tagDisabledState);
    const [vendorDisabled, setVendorDisabled] = useRecoilState(vendorDisabledState);
    const [productTypeDisabled, setProductTypeDisabled] = useRecoilState(productTypeDisabledState);
    const [collectionDisabled, setCollectionDisabled] = useRecoilState(collectionDisabledState);
    const [selectedFrom, setSelectedFrom] = useRecoilState(selectedFromState);
    const [selectedTo, setSelectedTo] = useRecoilState(selectedToState);
    const [selectedVendor, setSelectedVendor] = useRecoilState(selectedVendorState);
    const [selectedAgeDay, setSelectedAgeDay] = useRecoilState(selectedAgeDayState);
    const [taggedWith, setTaggedWith] = useRecoilState(taggedWithState);
    const [selectedProductType, setSelectedProductType] = useRecoilState(selectedProductTypeState);
    const [selectedCollection, setSelectedCollection] = useRecoilState(selectedCollectionState);
    const [queryValue, setQueryValue] = useRecoilState(queryValueState);

    // get values
    // const meerkatInfo = useRecoilValue(meerkatInfoState);
    const turtleInfo = useRecoilValue(shopState);

    // page size
    const pageSize = 30;

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setFetchingProducts(true);

                await fetch(`${APP_HOST}/data/filters`)
                    .then((resp) => resp.json())
                    .then((data) => setFilters(data));

                await fetch(`${APP_HOST}/data/products?pageSize=${pageSize}&${viewParams}`)
                    .then((resp) => resp.json())
                    .then((data) => {
                        setProducts(data.products);
                    });
            } catch (e) {
                if (e.response) {
                    setErrorFetchingProducts(
                        e.response.data
                            ? e.response.data
                            : e.response.status + ' Error',
                    );
                } else {
                    setErrorFetchingProducts(e.message);
                }
            } finally {
                setFetchingProducts(false);
            }
        };
        fetchAll();
    }, [viewParams]);

    const handleDisabledFilters = (filter) => {
        setAgeDayDisabled(filter !== 'ageDay' ? true : false);
        setTagDisabled(filter !== 'tag' ? true : false);
        setVendorDisabled(filter !== 'vendor' ? true : false);
        setProductTypeDisabled(filter !== 'productType' ? true : false);
        setCollectionDisabled(filter !== 'collection' ? true : false);
    };
    const handleDisabledFiltersClearAll = () => {
        setAgeDayDisabled(false);
        setTagDisabled(false);
        setVendorDisabled(false);
        setProductTypeDisabled(false);
        setCollectionDisabled(false);
    };

    const handleSelectedAgeDayChange = useCallback((value) => {
        setSelectedAgeDay(value);
        handleDisabledFilters('ageDay');
        setViewParams(`name=age&from=${value[0]}&to=${value[1]}`);
        // eslint-disable-next-line
    }, []);
    const handleTaggedWithChange = useCallback((value) => {
        setTaggedWith(value);
        handleDisabledFilters('tag');
        setViewParams(`name=tags&value=${value}`);
        // eslint-disable-next-line
    }, []);
    const handleSelectedVendorChange = useCallback((value) => {
        setSelectedVendor(value);
        handleDisabledFilters('vendor');
        setViewParams(`name=vendor&value=${value}`);
        // eslint-disable-next-line
    }, []);
    const handleProductTypeChange = useCallback((value) => {
        setSelectedProductType(value);
        handleDisabledFilters('productType');
        setViewParams(`name=productType&value=${value}`);
        // eslint-disable-next-line
    }, []);
    const handleCollectionChange = useCallback((value) => {
        setSelectedCollection(value);
        handleDisabledFilters('collection');
        setViewParams(`name=collections&value=${value}`);
        // eslint-disable-next-line
    }, []);
    const handleFiltersQueryChange = useCallback((value) => {
        const params = qs.parse(viewParams)
        if (params.hasOwnProperty('nextPage')) {
            delete params.nextPage;
        }
        if (params.hasOwnProperty('previousPage')) {
            delete params.previousPage;
        }
        if (params.hasOwnProperty('startSearch')) {
                    delete params.startSearch;
        }
        if (params.hasOwnProperty('endSearch')) {
                    delete params.endSearch;
        }

        const slicedValue = value.slice(0, value.length - 1);
        const lastValueChar = value.slice(value.length - 1, value.length);
        const endSearch = slicedValue + String.fromCharCode(lastValueChar.charCodeAt(0) + 1);
        const searchStartEncoded = btoa(JSON.stringify(value));
        const searchEndEncoded = btoa(JSON.stringify(endSearch));

        setQueryValue(value)
        setTimeout(() => {
            console.log('TimedOut-3secs');
            setViewParams(qs.stringify(params) + `&startSearch=${searchStartEncoded}&endSearch=${searchEndEncoded}`);
        }, 1500);

    }, []);

    const handleSelectedAgeDayRemove = useCallback(() => {
        setSelectedAgeDay('');
        handleDisabledFiltersClearAll();
        setViewParams('name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleTaggedWithRemove = useCallback(() => {
        setTaggedWith('');
        handleDisabledFiltersClearAll();
        setViewParams('name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleSelectedVendorRemove = useCallback(() => {
        setSelectedVendor('');
        handleDisabledFiltersClearAll();
        setViewParams('name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleProductTypeRemove = useCallback(() => {
        setSelectedProductType('');
        handleDisabledFiltersClearAll();
        setViewParams('name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleCollectionRemove = useCallback(() => {
        setSelectedCollection('');
        handleDisabledFiltersClearAll();
        setViewParams('name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleQueryValueRemove = useCallback(() => {
        setQueryValue('');
        setViewParams('name=none&value=none');
    }, []);

    const handleFiltersClearAll = useCallback(() => {
        handleSelectedAgeDayRemove();
        handleTaggedWithRemove();
        handleSelectedVendorRemove();
        handleProductTypeRemove();
        handleCollectionRemove();
        handleQueryValueRemove();
    }, [
        handleSelectedAgeDayRemove,
        handleTaggedWithRemove,
        handleSelectedVendorRemove,
        handleProductTypeRemove,
        handleCollectionRemove,
        handleQueryValueRemove,
    ]);

    const handleResourceListItems = useCallback(() => {
        let items = [];
        if (!isFetchingProducts && products.length > 1) {
            items = products.map((v) => {
                return {
                    id: v.id,
                    url:
                        v.transformedSrc !== ''
                            ? v.transformedSrc
                            : 'http://via.placeholder.com/640x360',
                    name: v.displayName,
                    age: v.age,
                    inventoryQuantity: v.inventoryQuantity,
                    cost: v.cost,
                    totalValueCost: v.totalValueCost,
                    price: v.price,
                    totalValuePrice: v.totalValuePrice,
                    updatedAt: v.updatedAt,
                }
            });
        }
        return items;
    }, [products, isFetchingProducts]);

    const filtersOpts = [
        {
            key: 'ageDay',
            label: 'Inventory Age',
            filter: (
                <FormLayout>
                    <FormLayout.Group>
                        <TextField
                            label='From:'
                            suffix='Days'
                            type='number'
                            value={selectedFrom}
                            placeholder='0'
                            min='0'
                            // error={this.state.unitError}
                            onChange={setSelectedFrom}
                            disabled={ageDayDisabled}
                        />
                        <TextField
                            label='To:'
                            suffix='Days'
                            type='number'
                            value={selectedTo}
                            placeholder='1'
                            min='1'
                            // error={this.state.unitError}
                            onChange={setSelectedTo}
                            disabled={ageDayDisabled}
                        />
                        <Button
                            onClick={() => {
                                const value = [selectedFrom, selectedTo];
                                handleSelectedAgeDayChange(value);
                            }}
                            disabled={ageDayDisabled}
                        >
                            Add Filter
                        </Button>
                    </FormLayout.Group>
                </FormLayout>
            ),
            shortcut: true,
            disabled: ageDayDisabled,
        },
        {
            key: 'taggedWith',
            label: 'Tagged with',
            filter: (
                <Filter
                    list={filters.tags}
                    onChange={handleTaggedWithChange}
                    value={taggedWith}
                    disabled={tagDisabled}
                />
            ),
            shortcut: true,
            disabled: tagDisabled,
        },
        {
            key: 'vendor',
            label: 'Product Vendor',
            filter: (
                <Filter
                    list={filters.vendors}
                    onChange={handleSelectedVendorChange}
                    value={selectedVendor}
                    disabled={vendorDisabled}
                />
            ),
            shortcut: false,
            disabled: vendorDisabled,
        },
        {
            key: 'productType',
            label: 'Product Type',
            filter: (
                <Filter
                    list={filters.productTypes}
                    onChange={handleProductTypeChange}
                    value={selectedProductType}
                    disabled={productTypeDisabled}
                />
            ),
            shortcut: false,
            disabled: productTypeDisabled,
        },
        {
            key: 'collection',
            label: 'Collection',
            filter: (
                <Filter
                    list={filters.collections}
                    onChange={handleCollectionChange}
                    value={selectedCollection}
                    disabled={collectionDisabled}
                />
            ),
            shortcut: true,
            disabled: collectionDisabled,
        },
    ];

    const appliedFilters = [];
    if (!isEmpty(selectedVendor)) {
        const key = 'vendor';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, selectedVendor),
            onRemove: handleSelectedVendorRemove,
        });
    }
    if (!isEmpty(selectedProductType)) {
        const key = 'productType';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, selectedProductType),
            onRemove: handleProductTypeRemove,
        });
    }
    if (!isEmpty(selectedCollection)) {
        const key = 'collection';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, selectedCollection),
            onRemove: handleCollectionRemove,
        });
    }
    if (!isEmpty(taggedWith)) {
        const key = 'taggedWith';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, taggedWith),
            onRemove: handleTaggedWithRemove,
        });
    }
    if (!isEmpty(selectedAgeDay)) {
        const key = 'ageDay';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, selectedAgeDay),
            onRemove: handleSelectedAgeDayRemove,
        });
    }

    if (isFetchingProducts) {
        return (
            <AgedProductsLoading />
        );
    }

    return (
        <React.Fragment>
            <div style={{width: '100%', margin: '20px'}}>
            <Layout>
                {!meerkatInfo.billingEnabled || !meerkatInfo.installed ? (
                <Layout.Section>
                    <Banner
                        title='Learn more about Discount Scheduler App - Meerkat'
                        action={{
                            content: 'Discount Scheduler',
                            external: true,
                            url: 'https://apps.shopify.com',
                        }}
                        status='info'
                        // onDismiss={() => {}}
                    >
                        <p>
                            Got inventory that needs to move out? Add Meerkat app to
                            automatically schedule sale and announce to you Social
                            channels!
                        </p>
                    </Banner>
                </Layout.Section>
                ) : '' }
                <Layout.Section>
                        <Card>
                            <ResourceList
                                resourceName={{
                                    singular: 'product',
                                    plural: 'products',
                                }}
                                filterControl={
                                    <Filters
                                        queryValue={queryValue}
                                        filters={filtersOpts}
                                        appliedFilters={appliedFilters}
                                        onQueryChange={handleFiltersQueryChange}
                                        onQueryClear={handleQueryValueRemove}
                                        onClearAll={handleFiltersClearAll}
                                    />
                                }
                                showHeader={false}
                                items={handleResourceListItems()}
                                renderItem={(item) => {
                                    const {
                                        id,
                                        url,
                                        name,
                                        age,
                                        inventoryQuantity,
                                        cost,
                                        totalValueCost,
                                        price,
                                        totalValuePrice,
                                        updatedAt,
                                    } = item;
                                    const rowStyle = {
                                        flex: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '6px',
                                    };
                                    const rowStyleQuantity = {
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '6px',
                                    };
                                    const displayName = (name === 'dummy') ? (
                                        <h1>
                                            <TextStyle variation="strong">Product Name</TextStyle>
                                        </h1>
                                    ) : name
                                    const agedDays = (age === 'dummy') ? (
                                        <h1>
                                            <TextStyle variation="strong">Days Aged</TextStyle>
                                        </h1>
                                    ) : abbreviate(age, 1);
                                    const productCounts = (inventoryQuantity === 'dummy') ? (
                                        <h1>
                                            <TextStyle variation="strong">Inventory</TextStyle>
                                        </h1>
                                    ) : abbreviate(inventoryQuantity, 1);
                                    const formattedCost = (cost === 'dummy') ? (
                                        <h1>
                                            <TextStyle variation="strong">Cost({turtleInfo.currencyCode})</TextStyle>
                                        </h1>
                                    ) : (cost.length > 0 ? cost : 0);
                                    const formattedTotalValueCost = (totalValueCost === 'dummy') ? (
                                        <h1>
                                            <TextStyle variation="strong">Total Value Cost({turtleInfo.currencyCode})</TextStyle>
                                        </h1>
                                    ) : totalValueCost;
                                    const formattedPrice = (price === 'dummy') ? (
                                        <h1>
                                            <TextStyle variation="strong">Price({turtleInfo.currencyCode})</TextStyle>
                                        </h1>
                                    ) : price;
                                    const formattedTotalValuePrice = (totalValuePrice === 'dummy') ? (
                                        <h1>
                                            <TextStyle variation="strong">Total Value Price({turtleInfo.currencyCode})</TextStyle>
                                        </h1>
                                    ) : totalValuePrice;
                                    const formattedDate = (updatedAt === 'dummy') ? (
                                        <h1>
                                            <TextStyle variation="strong">Last Time Purchased</TextStyle>
                                        </h1>
                                    ) : (moment().format('YYYY') ===
                                        moment(updatedAt).format('YYYY')
                                            ? moment(updatedAt).format('MMMM DD, h:mma')
                                            : moment(updatedAt).format('MMMM DD, YYYY, h:mma',));
                                    const media = (name === 'dummy') ? (
                                        <div style={{
                                            width: '70px',
                                            height: '45px'
                                        }}>
                                        </div>
                                    ) : (
                                            <div style={{ display: 'flex' }}>
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        maxWidth: '70px',
                                                        maxHeight: '60px',
                                                        padding: '0rem'
                                                    }}
                                                >
                                                    <img
                                                        alt={name}
                                                        src={url}
                                                        width='100%'
                                                    />
                                                </div>
                                            </div>
                                        // <Avatar
                                        //     customer={false}
                                        //     source={url}
                                        //     size='large'
                                        //     name={name}
                                        // />
                                    );

                                    return (
                                        <ResourceItem
                                            id={id}
                                            url={url}
                                            media={media}
                                            accessibilityLabel={`View details for ${name}`}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        ...rowStyle,
                                                        justifyContent: 'left',
                                                    }}
                                                >
                                                    {displayName}
                                                </div>
                                                <div
                                                    style={{
                                                        ...rowStyleQuantity,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {agedDays}
                                                </div>
                                                <div
                                                    style={{
                                                        ...rowStyleQuantity,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {productCounts}
                                                </div>
                                                <div
                                                    style={{
                                                        ...rowStyleQuantity,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {(formattedCost === 0) ?
                                                        (<TextStyle variation="negative">{formattedCost}</TextStyle>)
                                                        : (formattedCost)}
                                                </div>
                                                <div
                                                    style={{
                                                        ...rowStyle,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {(formattedTotalValueCost === 0) ?
                                                        (<TextStyle variation="negative">{formattedTotalValueCost}</TextStyle>)
                                                        : (formattedTotalValueCost)}
                                                </div>
                                                <div
                                                    style={{
                                                        ...rowStyleQuantity,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {(formattedPrice === 0) ?
                                                        (<TextStyle variation="negative">{formattedPrice}</TextStyle>)
                                                        : (formattedPrice)}
                                                </div>
                                                <div
                                                    style={{
                                                        ...rowStyle,
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {(formattedTotalValuePrice === 0) ?
                                                        (<TextStyle variation="negative">{formattedTotalValuePrice}</TextStyle>)
                                                        : (formattedTotalValuePrice)}
                                                </div>
                                                <div
                                                    style={{
                                                        ...rowStyle,
                                                        justifyContent: 'left',
                                                    }}
                                                >
                                                    {formattedDate}
                                                </div>
                                            </div>
                                        </ResourceItem>
                                    );
                                }}
                            />
                            <Card>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            padding: '15px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Pagination
                                            hasPrevious
                                            onPrevious={() => {
                                                const docEncoded = btoa(JSON.stringify(products[1]));
                                                const params = qs.parse(viewParams)
                                                if (params.hasOwnProperty('nextPage')) {
                                                    delete params.nextPage;
                                                }
                                                if (params.hasOwnProperty('previousPage')) {
                                                    delete params.previousPage;
                                                }

                                                if (products.length > 1) {
                                                    setViewParams(qs.stringify(params) + `&previousPage=${docEncoded}`);
                                                }
                                            }}
                                            hasNext
                                            onNext={() => {
                                                const docEncoded = btoa(JSON.stringify(products[products.length - 1]));
                                                const params = qs.parse(viewParams)
                                                if (params.hasOwnProperty('nextPage')) {
                                                    delete params.nextPage;
                                                }
                                                if (params.hasOwnProperty('previousPage')) {
                                                    delete params.previousPage;
                                                }

                                                if (products.length > 1) {
                                                    setViewParams(qs.stringify(params) + `&nextPage=${docEncoded}`);
                                                } else {
                                                    setViewParams(qs.stringify(params))
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </Card>
                </Layout.Section>
                </Layout>
                <FooterHelp>
                    Learn more about{' '}
                    <Link url="https://zoocommerce.co">
                        Aged Products
                    </Link>
                </FooterHelp>
            </div>
        </React.Fragment>
    );

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'taggedWith':
                return `Tagged with: ${value}`;
            case 'selectedVendor':
                return value.map((val) => `Vendor: ${val}`);
            case 'selectedProductType':
                return value.map((val) => `Product Type: ${val}`);
            case 'selectedCollection':
                return value.map((val) => `Collection: ${val}`);
            case 'ageDay':
                return `Inventory age is between ${value[0]} and ${value[1]}`;
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
};

export default AgedProducts;

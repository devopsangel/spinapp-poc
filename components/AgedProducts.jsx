import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
    Avatar,
    Card,
    Filters,
    ResourceList,
    TextField,
    Frame,
    Loading,
    FormLayout,
    Button,
    Layout,
    Banner,
    SkeletonBodyText,
    SkeletonDisplayText,
} from '@shopify/polaris';
import moment from 'moment';
import abbreviate from 'number-abbreviate';
import Filter from './Filter';

import {
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


const AgedProducts = () => {
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

    useEffect(() => {
        if (!filters.vendors) getFilters(dispatch);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!products || products.length === 0)
            getProducts(dispatch, 'name=none&value=none');
    }, [products, dispatch]);

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
        getProducts(dispatch, `name=age&from=${value[0]}&to=${value[1]}`);
        // eslint-disable-next-line
    }, []);
    const handleTaggedWithChange = useCallback((value) => {
        setTaggedWith(value);
        handleDisabledFilters('tag');
        getProducts(dispatch, `name=tags&value=${value}`);
        // eslint-disable-next-line
    }, []);
    const handleSelectedVendorChange = useCallback((value) => {
        setSelectedVendor(value);
        handleDisabledFilters('vendor');
        getProducts(dispatch, `name=vendor&value=${value}`);
        // eslint-disable-next-line
    }, []);
    const handleProductTypeChange = useCallback((value) => {
        setSelectedProductType(value);
        handleDisabledFilters('productType');
        getProducts(dispatch, `name=productType&value=${value}`);
        // eslint-disable-next-line
    }, []);
    const handleCollectionChange = useCallback((value) => {
        setSelectedCollection(value);
        handleDisabledFilters('collection');
        getProducts(dispatch, `name=collections&value=${value}`);
        // eslint-disable-next-line
    }, []);
    const handleFiltersQueryChange = useCallback((value) => setQueryValue(value), []);

    const handleSelectedAgeDayRemove = useCallback(() => {
        setSelectedAgeDay('');
        handleDisabledFiltersClearAll();
        getProducts(dispatch, 'name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleTaggedWithRemove = useCallback(() => {
        setTaggedWith('');
        handleDisabledFiltersClearAll();
        getProducts(dispatch, 'name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleSelectedVendorRemove = useCallback(() => {
        setSelectedVendor('');
        handleDisabledFiltersClearAll();
        getProducts(dispatch, 'name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleProductTypeRemove = useCallback(() => {
        setSelectedProductType('');
        handleDisabledFiltersClearAll();
        getProducts(dispatch, 'name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleCollectionRemove = useCallback(() => {
        setSelectedCollection('');
        handleDisabledFiltersClearAll();
        getProducts(dispatch, 'name=none&value=none');
        // eslint-disable-next-line
    }, []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(), []);

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
        if (!isFetchingProducts && products.length > 0) {
            items = products.map((v) => ({
                id: v.id,
                url:
                    v.transformedSrc !== ''
                        ? v.transformedSrc
                        : 'http://via.placeholder.com/640x360',
                name: v.displayName,
                age: v.age,
                inventoryQuantity: v.inventoryQuantity,
                updatedAt: v.updatedAt,
            }));
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
        const style = { flex: 2, margin: '0 12px' };
        return (
            <React.Fragment>
                <Frame>
                    <Loading />
                    <div>
                        <div style={{ margin: '20px' }}>
                            <SkeletonDisplayText />
                            <div style={{ height: '12px' }} />
                            <SkeletonBodyText lines={2} />
                        </div>
                        <hr style={{ margin: '6px 0 0 0', borderColor: '#DFE3E8' }} />
                        <ResourceList
                            items={['', '', '', '', '']}
                            renderItem={() => {
                                return (
                                    <ResourceList.Item>
                                        <div style={{ display: 'flex' }}>
                                            <div style={style}>
                                                <SkeletonBodyText lines={1} />
                                            </div>
                                            <div style={{ ...style, flex: 3 }}>
                                                <SkeletonBodyText lines={2} />
                                            </div>
                                            <div style={style}>
                                                <SkeletonBodyText lines={1} />
                                            </div>
                                            <div style={style}>
                                                <SkeletonBodyText lines={1} />
                                            </div>
                                            <div
                                                style={{
                                                    flex: 1,
                                                    margin: '0',
                                                    paddingLeft: '12px',
                                                }}
                                            >
                                                <SkeletonDisplayText />
                                            </div>
                                        </div>
                                    </ResourceList.Item>
                                );
                            }}
                        />
                    </div>
                </Frame>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Layout>
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
                            showHeader={true}
                            items={handleResourceListItems()}
                            renderItem={(item) => {
                                const {
                                    id,
                                    url,
                                    name,
                                    age,
                                    inventoryQuantity,
                                    updatedAt,
                                } = item;
                                const rowStyle = {
                                    flex: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '6px',
                                };

                                const agedDays = abbreviate(age, 1);
                                const productCounts = abbreviate(inventoryQuantity, 1);
                                const formattedDate =
                                    moment().format('YYYY') ===
                                    moment(updatedAt).format('YYYY')
                                        ? moment(updatedAt).format('MMMM DD, h:mma')
                                        : moment(updatedAt).format(
                                              'MMMM DD, YYYY, h:mma',
                                          );

                                const media = (
                                    <Avatar
                                        customer
                                        source={url}
                                        size='large'
                                        name={name}
                                    />
                                );
                                return (
                                    <ResourceList.Item
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
                                                {name}
                                            </div>
                                            <div
                                                style={{
                                                    ...rowStyle,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {agedDays}{' '}
                                                {agedDays === 0 || agedDays === 1
                                                    ? 'day aged'
                                                    : 'days aged'}
                                            </div>
                                            <div
                                                style={{
                                                    ...rowStyle,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {productCounts}
                                                {' in stock'}
                                            </div>
                                            <div
                                                style={{
                                                    ...rowStyle,
                                                    justifyContent: 'left',
                                                }}
                                            >
                                                {'Purchased on '}
                                                {formattedDate}
                                            </div>
                                        </div>
                                    </ResourceList.Item>
                                );
                            }}
                        />
                    </Card>
                </Layout.Section>
            </Layout>
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

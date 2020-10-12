import { atom } from 'recoil';

export const fetchingProductState = atom({
    key: 'fetchingProductState',
    default: false,
});

export const errorFetchingProductState = atom({
    key: 'errorFetchingProductState',
    default: '',
});

export const filtersState = atom({
    key: 'filtersState',
    default: {},
});

export const productsState = atom({
    key: 'productsState',
    default: {},
});

export const viewParamsState = atom({
    key: 'viewParamsState',
    default: 'name=none&value=none',
});

export const agedProductsStateState = atom({
    key: 'agedProductsStateState',
    default: {},
});

export const ageDayDisabledState = atom({
    key: 'ageDayDisabledState',
    default: false,
});

export const tagDisabledState = atom({
    key: 'tagDisabledState',
    default: false,
});

export const vendorDisabledState = atom({
    key: 'vendorDisabledState',
    default: false,
});

export const productTypeDisabledState = atom({
    key: 'productTypeDisabledState',
    default: false,
});

export const collectionDisabledState = atom({
    key: 'collectionDisabledState',
    default: false,
});

export const selectedFromState = atom({
    key: 'selectedFromState',
    default: 0,
});

export const selectedToState = atom({
    key: 'selectedToState',
    default: 1,
});

export const selectedVendorState = atom({
    key: 'selectedVendorState',
    default: '',
});

export const selectedAgeDayState = atom({
    key: 'selectedAgeDayState',
    default: '',
});

export const taggedWithState = atom({
    key: 'taggedWithState',
    default: '',
});

export const selectedProductTypeState = atom({
    key: 'selectedProductTypeState',
    default: '',
});

export const selectedCollectionState = atom({
    key: 'selectedCollectionState',
    default: '',
});

export const queryValueState = atom({
    key: 'queryValueState',
    default: '',
});

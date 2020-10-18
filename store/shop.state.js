import { atom } from 'recoil';

export const shopState = atom({
    key: 'shopState',
    default: {
        loadCompleted: false,
    },
});

export const meerkatInfoState = atom({
    key: 'meerkatInfoState',
    default: {},
});

import { atom } from 'recoil';

export const initializingState = atom({
    key: 'initializingState',
    default: false,
});

export const errorState = atom({
    key: 'errorState',
    default: '',
});

export const commentsState = atom({
    key: 'commentsState',
    default: [],
});

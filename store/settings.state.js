import { atom } from 'recoil';

export const fetchingSettingsState = atom({
    key: 'fetchingSettingsState',
    default: false,
});

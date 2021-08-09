import {
    atom,
} from 'recoil';

export const darkmode = atom({
    key: 'darkmode',
    default: 'false',
});

export const imagebase64 = atom({
    key: 'imagebase64',
    default: '',
});

export const pid = atom({
    key: 'pid',
    default: '',
});

export const pname = atom({
    key: 'pname',
    default: '',
});

export const buypname = atom({
    key: 'buypname',
    default: '',
});

export const pcategory = atom({
    key: 'pcategory',
    default: '',
});

export const pexp = atom({
    key: 'pexp',
    default: '',
});

export const pexpDate = atom({
    key: 'pexpDate',
    default: '',
});

export const placation = atom({
    key: 'placation',
    default: '',
});

export const isdark = atom({
    key: 'isdark',
    default: 'no',
});

export const plist = atom({
    key: 'plist',
    default: [],
});


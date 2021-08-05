import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

export const imagebase64 = atom({
    key: 'imagebase64',
    default: '',
});

export const pname = atom({
    key: 'pname',
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
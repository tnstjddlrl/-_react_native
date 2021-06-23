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
import { atom } from "recoil";

const notiState = atom({
    key: 'notiState',
    default: [],
});

export default notiState;
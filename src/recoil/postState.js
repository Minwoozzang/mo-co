import { atom } from "recoil";

const postState = atom({
    key: 'postState',
    default: [],
});

export default postState;
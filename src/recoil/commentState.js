import { atom } from 'recoil';

const commentState = atom({
  key: 'commentState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

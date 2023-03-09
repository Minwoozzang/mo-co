import { atom } from 'recoil';

const confirmState = atom({
  key: 'confirmState',
  default: false,
});

export default confirmState;

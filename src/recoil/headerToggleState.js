import { atom } from 'recoil';

const headerToggle = atom({
  key: 'headerToggle',
  default: false,
});

export default headerToggle;

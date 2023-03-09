import { atom, selector } from 'recoil';

const teamPageState = atom({
  key: 'teamPageState',
  default: [],
});

export default teamPageState;

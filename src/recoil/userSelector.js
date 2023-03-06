import { selector } from 'recoil';
import { authService } from '../common/firebase';
import userState from './userState';

const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const userInfo = get(userState);
    const myInfo = userInfo.filter(
      (i) => i.uid === authService.currentUser?.uid,
    );

    return { userInfo, myInfo };
  },
});

export default userSelector;

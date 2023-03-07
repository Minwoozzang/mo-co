import { selector } from 'recoil';
import { authService } from '../common/firebase';
import userState from './userState';

const userSelector = selector({
  key: 'userSelector1234',
  get: ({ get }) => {
    const userInfor = get(userState);
    const myInfor = userInfor?.filter(
      (t) => t.uid === authService.currentUser.uid,
    );

    return { userInfor, myInfor };
  },
});

export default userSelector;

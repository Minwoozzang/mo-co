import { atom } from 'recoil';

const commentState = atom({
  key: 'commentState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default commentState;

/* 
1. 아톰 정의
2. 파베든 / 리액트쿼리든 데이터 불러온 다음에
3. app 최상단에서 데이터 불러와서 set해주고
4. 아무 컴포넌트에서 xxxxState 불러와서 사용하면 끝
*/

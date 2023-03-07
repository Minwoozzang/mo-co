import { useRecoilValue } from 'recoil';
import useUserDoc from '../hooks/useUserDoc';
import authState from '../recoil/authState';

function Test() {
  let b = 0;
  const user = useRecoilValue(authState);
  const userDoc = useUserDoc();
  // postState에 있는 전역 상태를 postCollection에 저장

  return (
    <div>
      <h1>Test</h1>
      <br />
      <p>uid : {user?.uid}</p>
      <p>displayName : {user?.displayName}</p>
      <p>photoURL : {user?.photoURL}</p>
      <p>email : {userDoc?.email}</p>
      <br />
      <h1>post 컬렉션 TEST</h1>
      <br />

      <br />
    </div>
  );
}

export default Test;

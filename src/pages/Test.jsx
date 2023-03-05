import { useRecoilValue } from 'recoil';
import useUserDoc from '../hooks/useUserDoc';
import authState from '../recoil/authState';

function Test() {
  const user = useRecoilValue(authState);
  const userDoc = useUserDoc();
  console.log('🚀 ~ file: Test.jsx:11 ~ Test ~ userDoc:', userDoc);

  return (
    <div>
      <h1>Test</h1>
      <p>uid : {user?.uid}</p>
      <p>displayName : {user?.displayName}</p>
      <p>photoURL : {user?.photoURL}</p>
      <p>email : {userDoc?.email}</p>
    </div>
  );
}

export default Test;

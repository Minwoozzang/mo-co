import { useRecoilValue } from 'recoil';
import useUserDoc from '../hooks/useUserDoc';
import authState from '../recoil/authState';
import useUserQuery from '../hooks/useUserQuery';
import { toast } from 'react-toastify';

function Test() {
  const user = useRecoilValue(authState);
  console.log('🚀 ~ file: Test.jsx:8 ~ Test ~ user:', user);
  const userDoc = useUserDoc();
  const myDoc = useUserQuery();
  console.log('🚀 ~ file: Test.jsx:10 ~ Test ~ myDoc:', myDoc);

  return (
    <div>
      <h1 onClick={notify}>Test</h1>
      <br />
      <p>uid : {user?.uid}</p>
      <p>displayName : {user?.displayName}</p>
      <p>photoURL : {user?.photoURL}</p>
      <p>isLogin : {user?.isLogin}</p>
      <p>email : {userDoc?.email}</p>
      <br />
      <h1>post 컬렉션 TEST</h1>
      <br />
    </div>
  );
}

export default Test;

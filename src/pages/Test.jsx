import { useRecoilValue } from 'recoil';
import useUserDoc from '../hooks/useUserDoc';
import authState from '../recoil/authState';
import useComment from '../hooks/useComment';
import commentState from '../recoil/commentState';

function Test() {
  const user = useRecoilValue(authState);
  const userDoc = useUserDoc();
  const comment = useRecoilValue(commentState);

  console.log(comment);
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
    </div>
  );
}

export default Test;

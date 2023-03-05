import { useRecoilValue } from 'recoil';
import authState from '../recoil/authState';

function Test() {
  const user = useRecoilValue(authState);
  return (
    <div>
      <h1>Test</h1>
      <p>{user?.uid}</p>
      <p>{user?.displayName}</p>
      <p>{user?.photoURL}</p>
    </div>
  );
}

export default Test;

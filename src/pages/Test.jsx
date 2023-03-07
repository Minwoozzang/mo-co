import { useRecoilValue } from 'recoil';
import useUserDoc from '../hooks/useUserDoc';
import authState from '../recoil/authState';
import useUserQuery from '../hooks/useUserQuery';

function Test() {
  const user = useRecoilValue(authState);
  // const userDoc = useUserDoc();
  const userDoc = useUserQuery();
  console.log("🚀 ~ file: Test.jsx:10 ~ Test ~ userDoc:", userDoc)

  if (userDoc?.isLoading) {
    return <div>로딩 중</div>;
  }
  if (userDoc?.isError) {
    return <div>에러</div>;
  }

  return (
    <div>
      <h1>Test</h1>
      <br />
      <p>uid : {user?.uid}</p>
      <p>displayName : {user?.displayName}</p>
      <p>photoURL : {user?.photoURL}</p>
      <br />
      <h1>user 컬렉션 TEST</h1>
      <br />
      <p>{userDoc?.email}</p>
      <p>{userDoc?.moreInfo.u_stack}</p>
      <p>{userDoc?.teamID}</p>
    </div>
  );
}

export default Test;

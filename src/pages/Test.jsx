import { useRecoilValue } from 'recoil';
import useUserDoc from '../hooks/useUserDoc';
import authState from '../recoil/authState';
import postState from '../recoil/postState';

function Test() {
  let b = 0;
  const user = useRecoilValue(authState);
  const userDoc = useUserDoc();
  // postState에 있는 전역 상태를 postCollection에 저장
  const postCollection = useRecoilValue(postState);
  console.log('🚀 ~ file: Test.jsx:10 ~ Test ~ a:', postCollection);

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
      {postCollection?.map((item) => (
        <div key={item.id}>
          <p>번호 : {(b = b + 1)}</p>
          <p>id : {item.id}</p>
          <p>제목 : {item.partyPostTitile}</p>
          <p>작성자 : {item.nickName}</p>
          <p>모임명 : {item.partyName}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Test;

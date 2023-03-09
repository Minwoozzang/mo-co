/* 
리액트 쿼리를 사용해
user 컬렉션에서
현재 로그인한 유저의 user 문서만 가져오는 커스텀 훅
*/

import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../common/firebase';
import { useRecoilValue } from 'recoil';
import authState from '../recoil/authState';

async function getUserCollection(uid) {
  const userRef = doc(db, 'user', uid);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() : null;
}

export default function useUserQuery() {
  const user = useRecoilValue(authState);
  const uid = user?.uid;
  const {
    isLoading,
    isError,
    data: userDoc,
  } = useQuery(['user', uid], () => getUserCollection(uid), {
    enabled: !!uid,
    cacheTime: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  return userDoc;
}
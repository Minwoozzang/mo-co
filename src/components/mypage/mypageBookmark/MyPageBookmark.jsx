import { onAuthStateChanged } from '@firebase/auth';
import { collection, onSnapshot, query, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { authService, db } from '../../../common/firebase';
import CardSection from '../../../shared/CardSection';
import {
  MyBookmarkBody,
  MyBookmarkTitle,
  MyBookmarkList,
} from './MyPageBookmarkStyle';
import { useNavigate } from 'react-router';

const MyPageBookmark = () => {
  const navigate = useNavigate();

  // 내 정보 가져오기
  const [userBookmark, setUserBookmark] = useState([]);
  const getUserBookmark = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserBookmark(newInfo[0]?.bookmarks);
    });

    return unsubscribe;
  };

  // post 정보 가져오기
  const [postBookmark, setPostBookmark] = useState([]);
  const getPostBookmark = () => {
    const q = query(collection(db, 'post'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostBookmark(newInfo);
    });

    return unsubscribe;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        getUserBookmark();
        getPostBookmark();
      }
    });
  }, []);

  return (
    <MyBookmarkBody>
      <MyBookmarkTitle>스크랩</MyBookmarkTitle>
      {postBookmark
        .filter((item) => userBookmark.includes(item.id))
        .map((item) => {
          return (
            <MyBookmarkList key={item.id}>
              <CardSection
                item={item}
                onClick={() => {
                  navigate(`/matedetail/${item.id}`);
                }}
              />
            </MyBookmarkList>
          );
        })}
    </MyBookmarkBody>
  );
};

export default MyPageBookmark;

// TODO: 북마크 할 카드를 누를 때 updateDoc으로 아이다 값을 넣어주고, 마이페이지에서 해당 아이디
//  값을 필터링 해서 가져온다

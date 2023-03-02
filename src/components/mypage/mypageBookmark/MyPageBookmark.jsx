import { onAuthStateChanged } from '@firebase/auth';
import { collection, onSnapshot, query, where } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { authService, db } from '../../../common/firebase';
import CardSection from '../../../shared/CardSection';
import {
  MyBookmarkBox,
  MyBookmarkBody,
  MyBookmarkTitle,
  MyBookmarkList,
  PageBox,
} from './MyPageBookmarkStyle';
import { useNavigate } from 'react-router';

import { Pagination } from 'antd';

const MyPageBookmark = () => {
  // 페이지네이션
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(2);

  const handleChange = (page) => {
    setMinValue(page * 2 - 2);
    setMaxValue(page * 2);
  };

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
    <>
      <MyBookmarkBox>
        <MyBookmarkTitle>
          스크랩 <br />
          모임리스트
        </MyBookmarkTitle>
        <MyBookmarkBody>
          {postBookmark
            .filter((item) => userBookmark?.includes(item.id))
            .slice(minValue, maxValue)
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
      </MyBookmarkBox>
      <PageBox>
        <Pagination
          style={{ backgroundColor: '#383838' }}
          defaultCurrent={1}
          defaultPageSize={2}
          onChange={handleChange}
          total={userBookmark ? userBookmark.length : 0}
        />
      </PageBox>
    </>
  );
};

export default MyPageBookmark;

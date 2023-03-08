import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { authService, db } from '../../../common/firebase';
import MyComment from './MyComment';
import {
  MyCommentBody,
  MyCommetTitle,
  MyCommentList,
  PageBox,
} from './MyPageCommentStyle';
import { Pagination } from 'antd';

const MyPageComment = () => {
  // 페이지네이션
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(2);

  const handleChange = (page) => {
    setMinValue(page * 2 - 2);
    setMaxValue(page * 2);
  };

  // 댓글
  const [myComment, setMyComment] = useState([]);

  // 댓글 정보 가져오기
  const getMyCommnet = () => {
    const q = query(
      collection(db, 'comment'),
      where('userId', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyComment(newInfo);
    });

    return unsubscribe;
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        getMyCommnet();
      }
    });
  }, []);

  return (
    <>
      <MyCommentBody>
        <MyCommetTitle>내가 쓴 댓글</MyCommetTitle>
        <MyCommentList>
          {myComment.slice(minValue, maxValue).map((myItem) => {
            return <MyComment myItem={myItem} key={myItem.id} />;
          })}
        </MyCommentList>
      </MyCommentBody>
      <PageBox>
        <Pagination
          style={{
            backgroundColor: '#383838',
          }}
          defaultCurrent={1}
          defaultPageSize={2}
          onChange={handleChange}
          total={myComment ? myComment.length : 0}
        />
      </PageBox>
    </>
  );
};

export default MyPageComment;

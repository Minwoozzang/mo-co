import { useState, useEffect } from 'react';
import { db, doc } from '../../../common/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Comment from '../comment/Comment';

const CommentList = ({ id }) => {
  // 데이터 실시간 변경 확인
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const postCollectionRef = collection(db, 'comment');
    // where을 쓰면 filter의 역할을 대신 해줄 수 있다
    // 파이어베이스의 고유기능
    const q = query(postCollectionRef, where('postId', '==', id));
    const getPost = onSnapshot(q, (snapshot) => {
      const testComment = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(testComment);
    });
    return getPost;
  }, []);
  console.log(comments);

  return (
    <>
      {comments.map((user) => {
        return <Comment key={user.commentId} user={user} />;
      })}
    </>
  );
};
export default CommentList;

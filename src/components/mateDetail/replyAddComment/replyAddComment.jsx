import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { authService, db } from './../../../common/firebase';
import {
  AddCommentListWrap,
  AddInputDiv,
  AddInputContent,
  AddCommentBtnDiv,
  AddCommentBtn,
  AddCommentListAll,
} from './replyAddCommentStyle';

const ReplyAddComment = ({ comment }) => {
  // 파베 인증
  const currentUser = authService.currentUser;
  // 데이터 올리기
  const NewDate = new Date().toLocaleDateString('kr');
  const [commentText, setCommentText] = useState('');
  // 유저 값 가져오기
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserUid, setCurrentUserUid] = useState('');

  const AddCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };
  console.log(comment);

  const AddCommentButton = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('로그인을 해주세요');
      return;
    }
    const newComment = {
      comment: commentText,
      userName: currentUser.displayName,
      userId: currentUserUid,
      createdAt: new Date(),
      date: NewDate,
      commentId: uuidv4(),
      userImg: currentUser.photoURL,
      //updatedoc사용할것 - 배열사용(등록, 수정, 삭제 모두 배열로)
    };

    const replyCommentRef = doc(db, 'comment', comment.id);
    await updateDoc(replyCommentRef, {
      replyComment: [...comment.replyComment, newComment],
    });
  };

  return (
    <>
      <AddCommentListAll>
        <AddCommentListWrap>
          <AddInputDiv>
            <AddInputContent
              onChange={AddCommentTextChange}
              value={commentText}
              placeholder={'댓글을 남겨주세요.'}
            />
          </AddInputDiv>
        </AddCommentListWrap>
        <AddCommentBtnDiv>
          <AddCommentBtn onClick={AddCommentButton}>등록하기</AddCommentBtn>
        </AddCommentBtnDiv>
      </AddCommentListAll>
    </>
  );
};

export default ReplyAddComment;

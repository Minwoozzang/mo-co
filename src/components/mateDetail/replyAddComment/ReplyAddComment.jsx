import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { authService, db } from '../../../common/firebase';
import {
  AddCommentListWrap,
  AddInputDiv,
  AddInputContent,
  AddCommentBtnDiv,
  AddCommentBtn,
  AddCommentListAll,
} from './ReplyAddCommentStyle';
import { toast } from 'react-toastify';
import useUserQuery from '../../../hooks/useUserQuery';

const ReplyAddComment = ({ comment, setDisplay }) => {
  const userDoc = useUserQuery();
  // 파베 인증
  const currentUser = authService.currentUser;
  // 데이터 올리기
  const NewDate = new Date().toLocaleDateString('kr');
  const [commentText, setCommentText] = useState('');

  const AddCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const AddCommentButton = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.warn('로그인을 해주세요');
      return;
    }
    const newComment = {
      comment: commentText,
      userName: userDoc?.nickname,
      userId: comment.userId,
      createdAt: new Date(),
      date: NewDate,
      commentId: uuidv4(),
      userImg: userDoc?.profileImg,
    };

    const replyCommentRef = doc(db, 'comment', comment.id);
    await updateDoc(replyCommentRef, {
      replyComment: [...comment.replyComment, newComment],
    });

    setDisplay(false);
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

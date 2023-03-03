import React from 'react';
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

const ReplyAddComment = () => {
  // 파베 인증
  const currentUser = authService.currentUser;

  const AddCommentTextChange = (e) => {
    e.preventDefault();
  };

  const AddCommentButton = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('로그인을 해주세요');
      return;
    }
    const replyCommentRef = doc(db, 'post');
    await updateDoc(replyCommentRef, {
      replyComment: [],
    });
  };

  return (
    <>
      <AddCommentListAll>
        <AddCommentListWrap>
          <AddInputDiv>
            <AddInputContent
              onChange={AddCommentTextChange}
              // value={commentText}
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

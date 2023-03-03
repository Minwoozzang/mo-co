import React from 'react';

import {
  AddCommentListWrap,
  AddInputDiv,
  AddInputContent,
  AddCommentBtnDiv,
  AddCommentBtn,
  AddCommentListAll,
} from './replyAddCommentStyle';

const ReplyAddComment = () => {
  const AddCommentTextChange = (e) => {
    e.preventDefault();
  };

  const AddCommentButton = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AddCommentListAll>
        <AddCommentListWrap>
          <AddInputDiv>
            <AddInputContent
              onChange={AddCommentTextChange}
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

import React from 'react';
import {
  AddCommentListAll,
  AddCommentListWrap,
  AddInputDiv,
  AddInputContent,
  AddCommentBtnDiv,
  AddCommentBtn,
} from './replyAddCommentstyle';

const ReplyAddComment = () => {
  const AddCommentTextChange = (e) => {
    setCommentText(e.target.value);
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

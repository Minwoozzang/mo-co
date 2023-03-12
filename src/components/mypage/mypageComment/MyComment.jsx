import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MyCommentsBox,
  MyCommentOfComment,
  MyCommentDate,
  MycommentOfTitile,
} from './MyPageCommentStyle';

const MyComment = ({ myItem }) => {
  const navigate = useNavigate();
  const navigateComment = () => {
    navigate(`/matedetail/${myItem.mateDetailId}`);
  };

  return (
    <MyCommentsBox onClick={navigateComment}>
      <MycommentOfTitile>{myItem.title}</MycommentOfTitile>
      <MyCommentOfComment>{myItem.comment}</MyCommentOfComment>
      <MyCommentDate>{myItem.date}</MyCommentDate>
    </MyCommentsBox>
  );
};

export default MyComment;

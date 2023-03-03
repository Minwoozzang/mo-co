import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MateDetailWriting from '../../components/mateDetail/mateDetailWrite/MateDetailWriting';
import DetailRecruit from './../../components/mateDetail/detailRecruit/DetailRecruit';
import AddComment from '../../components/mateDetail/addComment/AddComment';
import ReplyComment from '../../components/mateDetail/replyComment/replyCommentList';
import CommentList from '../../components/mateDetail/commentList/CommentList';
import { db, authService } from '../../common/firebase';
import {
  doc,
  updateDoc,
  query,
  collection,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usePosts from '../../hooks/usePost';
import defaultImg from '../../assets/icon/user.png';

const MateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // 파베 인증
  const currentUser = authService.currentUser;
  // 유저 닉네임 - 프로필 가져오기 상태
  const [nickName, setNickName] = useState('');
  const [profileImg, setGetProfileImg] = useState('');
  const { data } = usePosts();
  const thisPost = data?.filter((item) => item.id === id);
  let isMyPost = thisPost[0]?.uid === currentUser?.uid;

  // 유저 닉네임 - 프로필 가져오기 함수
  const getUserInfo = () => {
    if (currentUser !== null) {
      const displayName = currentUser.displayName;
      const photoURL = currentUser.photoURL;
      setNickName(displayName);
      setGetProfileImg(photoURL);
    }
  };
  useEffect(() => {
    if (!currentUser) return;
    getUserInfo();
  }, [currentUser]);

  // 작성자만 수정가능하게
  const handleMoveToEdit = () => {
    navigate(`/edit/${id}`);
  };

  // ! 모집글 삭제 함수 (표면상 삭제이지만, 팀페이지에서 글의 정보를 가져가 사용하기 때문에 비활성화 처리합니다)
  const handleDelete = async () => {
    try {
      await updateDoc(doc(db, 'post', id), {
        isDeleted: true,
      });
      alert('삭제 성공');
      navigate('/mate');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MateDetailWrap>
      <MateDetailContainer>
        <MateDetailWriting />
        <CommentBtnWrap>
          {isMyPost === true ? (
            <CommentBtn onClick={handleDelete}>삭제</CommentBtn>
          ) : null}
          {isMyPost === true ? (
            <CommentBtn onClick={handleMoveToEdit}>수정</CommentBtn>
          ) : null}
        </CommentBtnWrap>
      </MateDetailContainer>
      <CommentWrap>
        {/* <UserHr /> */}
        <CommentContainHeader>댓글</CommentContainHeader>
        <CommentList id={id} img={profileImg} />
        <AddComment id={id} />
      </CommentWrap>
      <DetailRecruit />
    </MateDetailWrap>
  );
};
export default MateDetail;

const MateDetailWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px 400px 0px 0px;
  // min-height: 100vh;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-color: #111111;
`;
const MateDetailContainer = styled.div`
  width: 100%;
`;
const CommentWrap = styled.div`
  width: 100%;
  margin: 50px 0 50px 0;
`;

const CommentContainHeader = styled.p`
  width: 97px;
  height: 29px;
  font-size: 20px;
  font-weight: 500;
  line-height: 29px;
  margin: 30px 0 30px 0;
  color: #fff;
  margin: 0 250px 0 420px;
`;
const UserHr = styled.hr`
  border: 0;
  height: 0;
  border-top: 1px solid #8c8c8c;
`;
const CommentBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0 0 150px;
`;
const CommentBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 10px;
  background-color: #fff;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 600;
`;

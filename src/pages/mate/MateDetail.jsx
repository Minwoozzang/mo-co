import styled from '@emotion/styled';
import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { db } from '../../common/firebase';
import AddComment from '../../components/mateDetail/addComment/AddComment';
import CommentList from '../../components/mateDetail/commentList/CommentList';
import MateDetailWriting from '../../components/mateDetail/mateDetailWrite/MateDetailWriting';
import usePosts from '../../hooks/usePost';
import authState from '../../recoil/authState';
import DetailRecruit from './../../components/mateDetail/detailRecruit/DetailRecruit';

const MateDetail = () => {
  const queryClient = useQueryClient();
  const user = useRecoilValue(authState);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = usePosts();
  const thisPost = data?.filter((item) => item.id === id);
  let isMyPost = thisPost[0]?.uid === user?.uid;

  const handleMoveToEdit = () => {
    navigate(`/edit/${id}`);
  };

  // ! 모집글 삭제 함수 (표면상 삭제이지만, 팀페이지에서 글의 정보를 가져가 사용하기 때문에 비활성화 처리합니다)
  const handleDelete = async () => {
    try {
      await updateDoc(doc(db, 'post', id), {
        isDeleted: true,
      });
      await updateDoc(doc(db, 'teamPage', thisPost[0]?.teamID), {
        isDeleted: true,
      });
      toast.success('삭제 성공');
      navigate('/mate');
      queryClient.invalidateQueries('teamPage');
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

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
        <CommentList id={id} img={user?.photoURL} />
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
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 0px 0 50px 0;
  }
`;

const CommentContainHeader = styled.p`
  width: 97px;
  height: 29px;
  font-size: 20px;
  font-weight: 500;
  line-height: 29px;
  margin: 30px 250px 30px 360px;
  color: #fff;
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 30px 250px 30px 150px;
  }
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
  margin: 20px 0 0 30px;
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 20px 30px 0 30px;
  }
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

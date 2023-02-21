import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { db, authService } from './../../../common/firebase';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';

const DetailRecruit = () => {
  // 프로필 이미지 받아오기
  const [myProfileImg, setMyProfileImg] = useState([]);
  const GetMyProfileImg = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyProfileImg(newInfo[0]?.profileImg);
    });
    return unsubscribe;
  };

  const { id } = useParams();
  const [post, setpost] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 주최자에게 전하는 말
  const [joinMessage, setJoinMessage] = useState('');

  // ! 값이 안 들어오고 있음 ( teamPage 컬렉션에서 가져옴 )
  const [teamMember, setTeamMember] = useState([]);
  console.log(
    '🚀 ~ file: DetailRecruit.jsx:16 ~ DetailRecruit ~ teamMember:',
    teamMember,
  );

  const handleModalOpen = () => {
    setIsModalOpen(true);
    getTeamID();
  };

  const getTeamID = () => {
    getDoc(doc(db, 'teamPage', post.teamID))
      .then((userDoc) => {
        const teamPage = userDoc.data();
        setTeamMember(teamPage.teamMember);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalOk = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'teamPage', post.teamID), {
      teamMember: [
        ...teamMember,
        {
          uid: authService.currentUser.uid,
          teamPositon: '멤버',
          joinMessage: joinMessage,
          isWait: true,
          nickName: authService.currentUser.displayName,
          profileImg: myProfileImg,
        },
      ],
    });
    console.log('참여 완료');
    setIsModalOpen(false);
  };

  const handleModalCancel = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const getPost = async () => {
    const q = doc(db, 'post', id);
    const postData = await getDoc(q);
    //비동기
    setpost(postData.data());
  };

  useEffect(() => {
    getPost();
    GetMyProfileImg();
  }, []);

  return (
    <RecruitWrap>
      <RecruitArea>
        <RecruitFont>모임지역</RecruitFont>
        <AreaDetail>{post.partyLocation}</AreaDetail>
      </RecruitArea>
      <RecruitDate>
        <RecruitFont>모임시간</RecruitFont>
        <DateDetail>{post.partyTime}</DateDetail>
      </RecruitDate>
      <RecruitStack>
        <RecruitFont>기술스택</RecruitFont>
        <StackDetail>{post.Stack}</StackDetail>
      </RecruitStack>
      <RecruitCurrent>
        <RecruitFont>모집현황</RecruitFont>
        <RecruitDetail>{post.partyNum}</RecruitDetail>
      </RecruitCurrent>
      <RecruitBtn onClick={handleModalOpen}>참여 신청</RecruitBtn>
      <Modal
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        cancelText="취소"
        okText="참여하기"
        centered={true}
        closable={false}
        footer={false}
      >
        <RecruitModal>
          <RecruitModalTitle>참여하시겠어요?</RecruitModalTitle>
          <RecruitModalContentBox>
            <RecruitModalContent
              onChange={(e) => {
                setJoinMessage(e.target.value);
              }}
              value={joinMessage}
              maxLength={220}
              placeholder="주최자에게 전하고 싶은 말을 적어주세요 ( 소개, 지원 동기 등 )"
            />
          </RecruitModalContentBox>
          <RecruitModalBtnBox>
            <RecruitModalBtnNo onClick={handleModalCancel}>
              취소
            </RecruitModalBtnNo>
            <RecruitModalBtnYes onClick={handleModalOk}>
              참여하기
            </RecruitModalBtnYes>
          </RecruitModalBtnBox>
          <RecruitFooter>
            * 신청하시면, 정보제공 및 유의사항에 동의한 것으로 간주합니다.
          </RecruitFooter>
          <h4 style={{ padding: 20 }}>유의사항</h4>
          <RecruitGuide>1. 코딩금지</RecruitGuide>
        </RecruitModal>
      </Modal>
    </RecruitWrap>
  );
};

export default DetailRecruit;

const RecruitWrap = styled.div`
  width: 280px;
  height: 426px;
  border: 1px solid #d9d9d9;
  background-color: rgba(217, 217, 217, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 150px;
  right: 50px;
`;
const RecruitFont = styled.p`
  font-size: 12px;
  font-weight: 400;
`;
const RecruitArea = styled.div``;
const AreaDetail = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
const RecruitDate = styled.div``;
const DateDetail = styled.p``;
const RecruitStack = styled.div``;
const StackDetail = styled.p``;
const RecruitCurrent = styled.div``;
const RecruitDetail = styled.div``;
const RecruitBtn = styled.button`
  width: 152px;
  height: 40px;
  border: 1px solid #b9b9b9;
  background: rgba(217, 217, 217, 0.1);
`;

const RecruitModal = styled.form`
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RecruitModalTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

const RecruitModalContentBox = styled.div`
  padding: 20px;
  flex-direction: row;
  display: flex;
`;
const RecruitModalContent = styled.textarea`
  flex: 1;
  padding: 20px;
  border: 1px solid #d9d9d9;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100px;
  outline: none;
  font-size: 15px;
`;

const RecruitModalBtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const RecruitModalBtnNo = styled.button`
  width: 200px;
  height: 45px;
  border: 1px solid black;
  background-color: transparent;
`;

const RecruitModalBtnYes = styled.button`
  width: 200px;
  height: 45px;
  border: 1px solid black;
  background-color: transparent;
`;

const RecruitFooter = styled.div`
  padding: 20px;
  color: #b9b9b9;
`;

const RecruitGuide = styled.div`
  padding: 20px;
`;

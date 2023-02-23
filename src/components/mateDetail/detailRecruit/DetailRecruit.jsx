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
  const { id } = useParams();
  const [post, setpost] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 주최자에게 전하는 말
  const [joinMessage, setJoinMessage] = useState('');
  const [teamMember, setTeamMember] = useState([]);
  // 참여신청 버튼 비활성화 여부
  const [teamPage, setTeamPage] = useState([]);
  let isBtnDisabled = false;
  let isDone = false;
  // 내가 참여 신청한 팀 리스트
  let myTeamIdList = [];
  const getMyTeamIdList = teamPage.forEach((item) => {
    item.teamMember.forEach((member) => {
      if (member.nickName === authService?.currentUser?.displayName) {
        myTeamIdList.push(item.teamID);
        return false;
      }
    });
  });

  /*
  참여 신청 버튼 비활성화 조건
  1. 내가 주최자일 경우
  2. 모집이 완료된 경우 ( 모집 완료 텍스트 포함 )
  3. 이미 신청한 경우 ( 신청 완료 텍스트 포함 )
  */
  if (post.uid === authService.currentUser.uid) {
    isBtnDisabled = true;
  } else if (post.partyIsOpen === false) {
    isBtnDisabled = true;
  } else if (myTeamIdList.includes(post.teamID)) {
    isBtnDisabled = true;
    isDone = true;
  }

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
    })
      .then(() => {
        updateDoc(doc(db, 'user', authService.currentUser.uid), {
          teamID: post.teamID,
        });
      })
      .catch(() => {
        console.log('참여 신청 에러');
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
    setpost(postData.data());
  };

  useEffect(() => {
    const teamPageCollectionRef = collection(db, 'teamPage');
    const q = query(teamPageCollectionRef);
    const getTeamPage = onSnapshot(q, (snapshot) => {
      const teamPageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamPage(teamPageData);
    });
    return getTeamPage;
  }, []);

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
        <StackDetail>{post.partyStack}</StackDetail>
      </RecruitStack>
      <RecruitCurrent>
        <RecruitFont>모집현황</RecruitFont>
        <RecruitDetail>{post.partyNum}</RecruitDetail>
      </RecruitCurrent>
      <RecruitBtn
        title="dfdfd"
        disabled={isBtnDisabled}
        onClick={handleModalOpen}
      >
        {isDone
          ? '신청 완료'
          : '참여 신청' || post.partyIsOpen === false
          ? '모집 완료'
          : '참여 신청'}
      </RecruitBtn>
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
const RecruitArea = styled.div`
  width: 100%;
`;
const AreaDetail = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
const RecruitDate = styled.div`
  width: 100%;
`;
const DateDetail = styled.p`
  font-size: 16px;
`;
const RecruitStack = styled.div`
  width: 100%;
`;
const StackDetail = styled.p``;
const RecruitCurrent = styled.div`
  width: 100%;
`;
const RecruitDetail = styled.div`
  font-size: 16px;
`;
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

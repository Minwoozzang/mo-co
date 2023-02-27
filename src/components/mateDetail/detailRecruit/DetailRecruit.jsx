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
import { db, authService } from './../../../common/firebase';
import { useParams } from 'react-router-dom';
import { Modal } from 'antd';
import {
  RecruitWrap,
  RecruitFont,
  RecruitArea,
  AreaDetail,
  RecruitDate,
  DateDetail,
  RecruitStack,
  StackDetail,
  RecruitCurrent,
  RecruitDetail,
  RecruitBtn,
  RecruitModal,
  RecruitModalTitle,
  RecruitModalContentBox,
  RecruitModalContent,
  RecruitModalBtnBox,
  RecruitModalBtnNo,
  RecruitModalBtnYes,
  RecruitFooter,
  RecruitGuide,
  UserHr,
} from './DetailRecruitStyle';

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

  if (post.uid === authService?.currentUser?.uid) {
    isBtnDisabled = true;
  }

  if (post.partyIsOpen === false) {
    isBtnDisabled = true;
  }

  if (myTeamIdList.includes(post.teamID)) {
    isBtnDisabled = true;
  }

  // 프로필 이미지, 팀 ID 받아오기
  const [myProfileImg, setMyProfileImg] = useState([]);
  const [teamIDUserInfo, setTeamIDUserInfo] = useState([]);

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
      setTeamIDUserInfo(newInfo[0]?.teamID);
    });
    return unsubscribe;
  };

  const handleModalOpen = () => {
    if (!authService.currentUser) {
      alert('로그인 후 이용해주세요');
      return;
    }
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
          teamID: [...teamIDUserInfo, post.teamID],
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
    if (authService.currentUser) {
      GetMyProfileImg();
    }
    // GetMyProfileImg();
  }, []);

  return (
    <RecruitWrap>
      <RecruitArea>
        <RecruitFont>모임지역</RecruitFont>
        <AreaDetail>{post.partyLocation}</AreaDetail>
      </RecruitArea>
      <UserHr />
      <RecruitDate>
        <RecruitFont>모임시간</RecruitFont>
        <DateDetail>{post.partyTime}</DateDetail>
      </RecruitDate>
      <UserHr />
      <RecruitStack>
        <RecruitFont>기술스택</RecruitFont>
        <StackDetail>
          {post.partyStack.map((item, idx) => (
            <img
              key={idx}
              src={require(`../../../assets/stack/${item}.png`)}
              alt={item}
              style={{ width: 30, height: 30, marginRight: 10 }}
            />
          ))}
        </StackDetail>
      </RecruitStack>
      <UserHr />
      <RecruitCurrent>
        <RecruitFont>모집현황</RecruitFont>
        <RecruitDetail>모집진행 {post.partyNum}</RecruitDetail>
      </RecruitCurrent>
      <RecruitBtn disabled={isBtnDisabled} onClick={handleModalOpen}>
        모임 참여 신청
      </RecruitBtn>
      <Modal open={isModalOpen} centered={true} closable={false} footer={false}>
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

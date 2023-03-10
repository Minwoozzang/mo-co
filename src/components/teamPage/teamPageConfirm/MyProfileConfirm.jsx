import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import cancel from '../../../../src/assets/icon/Icon_cancel.png';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { authService, db } from '../../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const MyProfileConfirm = (props) => {
  // 해당 UID
  const myId = props.data.uid;

  // 유저 정보 가져오기
  const [profileUserInfo, setProfileUserInfo] = useState([]);

  // 스택 정보 기져오기
  const [stackIsRemote, setStaclIsRemote] = useState('');
  const [stackPlace, setStackPlace] = useState('');
  const [stackTime, setStackTime] = useState('');
  const [techStack, setTechStack] = useState([]);

  // 유저 정보 불러오기
  const getUserStackInfo = () => {
    const q = query(collection(db, 'user'), where('uid', '==', myId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfileUserInfo(newInfo);
      setStaclIsRemote(newInfo[0]?.moreInfo.u_isRemote);
      setStackPlace(newInfo[0]?.moreInfo.u_location);
      setStackTime(newInfo[0]?.moreInfo.u_time);
      setTechStack(newInfo[0]?.moreInfo.u_stack);
    });

    return unsubscribe;
  };

  // 유저 확인
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        getUserStackInfo();
      }
    });
  }, []);

  return (
    <ProfileBody onClick={props.onClose}>
      <ProfileBox>
        <CancelImgBox>
          <CancelImg onClick={props.onClose} src={cancel} />
        </CancelImgBox>
        <ImgNickNameBox>
          <MyImage src={profileUserInfo[0]?.profileImg} />
          <MyNickName>{profileUserInfo[0]?.nickname}</MyNickName>
        </ImgNickNameBox>

        <hr
          style={{
            border: '1px solid #3B3B3B',
            width: '270px',
            marginLeft: '25px',
          }}
        />

        <ProfileMiddleSection>
          <MiddleBody>
            <ProfileStackBody>
              <StackbodyTitle>온/오프라인</StackbodyTitle>
              <StackbodyText>
                {stackIsRemote ? '온라인' : '오프라인'}
              </StackbodyText>
            </ProfileStackBody>
            <ProfileStackBody>
              <StackbodyTitle>모임 장소</StackbodyTitle>
              <StackbodyText>서울시 {stackPlace}</StackbodyText>
            </ProfileStackBody>
            <ProfileStackBody>
              <StackbodyTitle>모임 시간</StackbodyTitle>
              <StackbodyText>{stackTime}</StackbodyText>
            </ProfileStackBody>
            <ProfileTechBody>
              <TechBodyTitle>기술 스택</TechBodyTitle>
              <TechBodyImage>
                {techStack.map((item, idx) => (
                  <img
                    key={idx}
                    src={require(`../../../../src/assets/stack/${item}.png`)}
                    alt={item}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                ))}
              </TechBodyImage>
            </ProfileTechBody>
          </MiddleBody>
        </ProfileMiddleSection>
      </ProfileBox>
    </ProfileBody>
  );
};

export default MyProfileConfirm;

const ProfileBody = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 990;
`;

const ProfileBox = styled.div`
  width: 20rem;
  height: 30rem;

  background: #111111;

  border: 1px solid #232323;
  border-radius: 20px;
`;

const CancelImgBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 0.9375rem;
`;

const CancelImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;

  margin-right: 0.9375rem;

  cursor: pointer;
`;

const ImgNickNameBox = styled.div`
  text-align: center;

  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`;

const MyImage = styled.img`
  width: 5.625rem;
  height: 5.625rem;
  object-fit: cover;
  border-radius: 45px;
`;

const MyNickName = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1875rem;
  letter-spacing: -0.03em;

  color: #ffffff;

  margin-top: 0.625rem;
`;
const ProfileMiddleSection = styled.div`
  width: 20rem;
  height: 12.5rem;

  margin-top: 1.5625rem;

  display: flex;
  justify-content: center;
`;
const MiddleBody = styled.div`
  width: 70%;
  height: 100%;
`;
const ProfileStackBody = styled.div`
  width: 100%;
  height: 1.5625rem;

  margin-top: 0.625rem;

  display: flex;
  align-items: center;
`;
const StackbodyTitle = styled.div`
  width: 55%;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.02rem;
  line-height: 1.0625rem;

  letter-spacing: -0.03em;

  color: #9d9d9d;
`;
const StackbodyText = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.02rem;
  line-height: 1.0625rem;

  letter-spacing: -0.03em;

  color: #ffffff;
`;
const ProfileTechBody = styled.div`
  width: 100%;

  margin-top: 0.625rem;
`;
const TechBodyTitle = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.02rem;
  line-height: 1.0625rem;

  letter-spacing: -0.03em;

  color: #9d9d9d;

  margin-bottom: 0.625rem;
`;
const TechBodyImage = styled.div``;

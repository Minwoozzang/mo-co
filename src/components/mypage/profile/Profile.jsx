import { onAuthStateChanged, updateProfile } from 'firebase/auth';

import React, { useEffect, useRef, useState } from 'react';
import { RiFolderUserFill } from 'react-icons/ri';
import { authService, db } from '../../../common/firebase';
import {
  MyProfileBody,
  ProfileSection,
  ProfileHeaderIcon,
  ProfileImageBody,
  ProfileImage,
  ProfileEditBody,
  EditNickNameInput,
  ProfileNickNameBody,
  ProfileNickName,
  ProfileNickNameBtn,
  NickNameCompleteBtn,
  ProfileMiddleSection,
  MiddleBody,
  ProfileStackBody,
  StackbodyTitle,
  StackbodyText,
  ProfileTechBody,
  TechBodyTitle,
  TechBodyImage,
  ProfileFooterBody,
  ProfileStackBtn,
  ProfileMocoText,
  NicknameImageBox,
  NicknameTextBox,
  NicaknameHello,
  ProfileSectionGap,
} from './ProfileStyle';
import { doc, updateDoc } from '@firebase/firestore';
import { useNavigate } from 'react-router';
import wheel from '../../../../src/assets/login/wheel.png';
import default_profile from '../../../assets/icon/user.png';
import { useRecoilValue } from 'recoil';
import userState from '../../../recoil/userState';
import { useQueryClient } from 'react-query';
import userSelector from '../../../recoil/userSelector';
import useUser from '../../../hooks/useUser';

const Profile = () => {
  // 유저 가져오기 (Recoil)
  const userInfo = useRecoilValue(userState);

  const { myInfor } = useRecoilValue(userSelector);

  // TODO: 이거부터 해보자
  const { data, isLoading, isLoadingError } = useUser();

  console.log('resss', userInfo);
  const queryClient = useQueryClient();

  const [getUser, setGetUser] = useState(userInfo);

  // 네이게이트
  const navigate = useNavigate();

  // 닉네임 수정 input 여부
  const [editNickNameBtn, setEditNickName] = useState(false);

  // 닉네임
  const [nickName, setNickName] = useState('');
  const [nickNamevalue, setNickNameValue] = useState('');

  // 현재 유저
  const [currentUser, setCurrentUser] = useState('');

  // 포토 URL
  const [newPhotoURL, setNewPhotoURL] = useState('');

  // 이미지 선택
  const inputImageRef = useRef();

  // 유저 확인
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setCurrentUser(authService.currentUser.uid);
        setNickName(authService.currentUser.displayName);
      }
    });
  }, [currentUser, nickName, data]);

  // 수정, 완료 토글
  const [clickEditBtn, setClickBtn] = useState(true);

  // 닉네임 수정 버튼 클릭시
  const edditNickName = () => {
    setClickBtn(false);
    setNickNameValue(nickName);
    setEditNickName(true);
  };

  // 닉네임 완료 버튼 클릭시
  const completeNickName = async () => {
    await updateProfile(authService.currentUser, {
      displayName: nickNamevalue,
    });
    await updateDoc(doc(db, 'user', authService.currentUser.uid), {
      nickname: nickNamevalue,
    });
    queryClient.invalidateQueries('user');
    alert('닉네임 수정 완료');
    setClickBtn(true);
    setEditNickName(false);
  };

  // 이미지 선탣
  const profileHandler = () => {
    inputImageRef.current.click();
  };

  // 이미지 수정
  const onFileChange = async (e) => {
    const theFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (e) => {
      const imgUrl = e.currentTarget.result;
      localStorage.setItem('imgUrl', imgUrl);
      updateDoc(doc(db, 'user', authService.currentUser.uid), {
        profileImg: imgUrl,
      });
      setNewPhotoURL(imgUrl);
    };
    alert('프로필 이미지 수정 완료');
  };

  // 맞춤 정보 수장
  const EditStackBtn = () => {
    navigate('/onboarding');
  };

  return (
    <>
      {isLoading && (
        <p style={{ backgroundColor: 'white', fontSize: '40px' }}>로딩중</p>
      )}

      {/* <MyProfileBody>
        <ProfileSection>
          <ProfileSectionGap />
          <ProfileMocoText>마이 모코</ProfileMocoText>
          <NicknameImageBox>
            <NicknameTextBox>
              <NicaknameHello>안녕하세요</NicaknameHello>
              <ProfileEditBody>
                <ProfileNickNameBody>
                  {editNickNameBtn ? (
                    <EditNickNameInput
                      value={nickNamevalue ? nickNamevalue : ''}
                      onChange={(e) => setNickNameValue(e.target.value)}
                    />
                  ) : (
                    <ProfileNickName>{data[0]?.nickname}님</ProfileNickName>
                  )}
                  {clickEditBtn ? (
                    <ProfileNickNameBtn onClick={edditNickName}>
                      수정
                    </ProfileNickNameBtn>
                  ) : (
                    <NickNameCompleteBtn onClick={completeNickName}>
                      완료
                    </NickNameCompleteBtn>
                  )}
                </ProfileNickNameBody>
              </ProfileEditBody>
            </NicknameTextBox>

            <ProfileImageBody>
              <ProfileImage
                src={data[0]?.profileImg ? data[0].profileImg : default_profile}
                width="90"
                height="90"
                alt=""
              />
            </ProfileImageBody>
            <ProfileHeaderIcon>
              <img
                src={wheel}
                alt=""
                style={{ fontSize: '25px' }}
                onClick={profileHandler}
              />
            </ProfileHeaderIcon>
          </NicknameImageBox>

          <input
            type="file"
            onChange={onFileChange}
            ref={inputImageRef}
            style={{ display: 'none' }}
            accept="image/*"
          />

          <hr style={{ width: '305px' }} />

          <ProfileMiddleSection>
            <MiddleBody>
              <ProfileStackBody>
                <StackbodyTitle>온/오프라인</StackbodyTitle>
                <StackbodyText>
                  {data[0]?.moreInfo?.u_isRemote ? '온라인' : '오프라인'}
                </StackbodyText>
              </ProfileStackBody>
              <ProfileStackBody>
                <StackbodyTitle>모임 장소</StackbodyTitle>
                <StackbodyText>
                  서울시 {data[0]?.moreInfo?.u_location}
                </StackbodyText>
              </ProfileStackBody>
              <ProfileStackBody>
                <StackbodyTitle>모임 시간</StackbodyTitle>
                <StackbodyText>{data[0]?.moreInfo?.u_time}</StackbodyText>
              </ProfileStackBody>
              <ProfileTechBody>
                <TechBodyTitle>기술 스택</TechBodyTitle>
                <TechBodyImage>
                  {data[0]?.moreInfo?.u_stack?.map((item, idx) => (
                    <img
                      key={idx}
                      src={require(`../../../assets/stack/${item}.png`)}
                      alt={item}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                  ))}
                </TechBodyImage>
              </ProfileTechBody>
            </MiddleBody>
          </ProfileMiddleSection>

          <ProfileFooterBody>
            <ProfileStackBtn onClick={EditStackBtn}>
              맞춤정보 수정
            </ProfileStackBtn>
          </ProfileFooterBody>
        </ProfileSection>
      </MyProfileBody> */}
    </>
  );
};

export default Profile;

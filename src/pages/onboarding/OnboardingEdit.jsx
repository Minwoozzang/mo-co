import styled from '@emotion/styled';
import { Checkbox } from 'antd';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  setDoc,
  where,
  getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { authService, db } from '../../common/firebase';
import { locations } from '../../data/locations';
import { stacks } from '../../data/stacks';
import { times } from '../../data/times';
import { useRecoilState } from 'recoil';
import userState from '../../recoil/userState';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export default function OnboardingEdit() {
  const [isRemote, setIsRemote] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  // 인풋값
  const [userStack, setUserStack] = useState([]);
  const [userTime, setUserTime] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  // 네비게이트
  const navigate = useNavigate();
  // 작성글 버튼 클릭 상태
  const [isClicked, setIsClicked] = useState(false);

  // 유저 정보 가져오기
  const [user, setUser] = useRecoilState(userState);

  // 기술 스택 선택 핸들러 함수
  const handleStack = (stack) => {
    if (userStack.includes(stack)) {
      setUserStack(userStack.filter((item) => item !== stack));
    } else {
      setUserStack([...userStack, stack]);
    }
  };

  const getPostData = () => {
    setUserStack(user[0].moreInfo.u_stack);
    setUserLocation(user[0].moreInfo.u_location);
    setIsRemote(user[0].moreInfo.u_isRemote);
    setUserTime(user[0].moreInfo.u_time);
  };

  // 비대면 모임 체크박스 핸들러 함수
  const handleisRemote = (e) => {
    setIsRemote(!isRemote);
    setIsDisabled(!isDisabled);
  };

  const updateIntroduce = async () => {
    const auth = getAuth();
    const user = auth.currentUser.uid;
    const userDoc = doc(db, 'user', String(user));
    const newField = {
      moreInfo: {
        u_stack: userStack,
        u_time: userTime,
        u_location: userLocation,
        u_isRemote: isRemote,
      },
    };
    try {
      await updateDoc(userDoc, newField);
      queryClient.invalidateQueries();
    } catch (e) {
      toast.warn('다시 시도해주세요');
    }
    navigate('/mypage');
  };

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        const auth2 = getAuth();
        const getUserName = async () => {
          setCurrentUserName(auth2.currentUser.displayName);
        };
        getUserName();
        getPostData();
      }
    });
  }, []);

  return (
    <>
      <JustContainerBox>
        <TextBox>
          <PhraseTitle>
            맞춤 모임 추천을 위해
            <br />
            {currentUserName ? currentUserName : '익명'}
            님의 정보를 알려주세요 🙌
          </PhraseTitle>
        </TextBox>
        <JustContainer>
          <WholeContainer>
            <AreaContainer>
              <h3>기술 스택</h3>
              <SetStacks>
                {stacks.map((techitem, idx) => (
                  <Stacks
                    style={{
                      backgroundColor: userStack.includes(techitem)
                        ? '#FEFF80'
                        : '#212121',
                      color: userStack.includes(techitem) ? '#212121' : 'white',
                    }}
                    key={idx}
                    onClick={() => handleStack(techitem)}
                  >
                    {techitem}
                  </Stacks>
                ))}
              </SetStacks>
            </AreaContainer>
            <AreaContainer>
              <h3>선호 시간 설정</h3>
              <FilterContainer>
                <Select
                  styles={{
                    menu: (provided) => ({ ...provided, color: 'black' }),
                  }}
                  options={times}
                  placeholder={!userTime ? '모임 시간대' : userTime}
                  onChange={(time) => setUserTime(time.value)}
                  value={userTime}
                />
              </FilterContainer>
            </AreaContainer>
            <AreaContainer>
              <h3>선호 지역 설정</h3>
              <FilterPlaceContainer>
                <FilterContainerOnly>
                  <Select
                    styles={{
                      menu: (provided) => ({ ...provided, color: 'black' }),
                    }}
                    options={locations}
                    placeholder={!userLocation ? '모집 지역' : userLocation}
                    onChange={(loc) => setUserLocation(loc.value)}
                    value={userLocation}
                    isDisabled={isDisabled}
                  />
                </FilterContainerOnly>
                <Checkbox
                  style={{ marginLeft: 20, color: 'white' }}
                  onChange={handleisRemote}
                >
                  비대면을 원해요
                </Checkbox>
              </FilterPlaceContainer>
            </AreaContainer>
          </WholeContainer>
        </JustContainer>
        <IntroSubmitBtnBox>
          <IntroSubmitBtn
            onClick={() => {
              setIsClicked(!isClicked);
              updateIntroduce();
            }}
            type="submit"
            style={{
              backgroundColor: isClicked ? '#f7f7f7' : '#FEFF80',
            }}
          >
            등록 완료
          </IntroSubmitBtn>
        </IntroSubmitBtnBox>
      </JustContainerBox>
    </>
  );
}

const JustContainerBox = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 0 2em 1em;
`;

const TextBox = styled.div`
  width: 1250px;
  margin: 50px auto 10px;
  padding: 40px;
  color: white;
  display: flex;
`;

const JustContainer = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 2em 1em;
  width: 100%;
`;

const WholeContainer = styled.div`
  max-width: 77.5rem;
  height: 95%;
  width: 100%;
  font-size: 0.9375rem;
  font-weight: 500;
  color: white;
  background-color: #212121;
  border-radius: 20px;
  position: relative;
  padding: 130px 130px 100px;
  margin: 0 6.25rem 6.25rem;
  background-position: center;
`;

const PhraseTitle = styled.p`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
  color: white;
`;

const AreaContainer = styled.div`
  margin-bottom: 6.25rem;
  color: white;
`;

const SetStacks = styled.div`
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  color: black;
`;

const Stacks = styled.div`
  border-radius: 1.875rem;
  border: 0.0625rem solid #b9b9b9;
  font-size: 0.9375rem;
  text-align: center;
  padding: 0.75rem 0;
  width: 8.125rem;
  color: white;
  cursor: pointer;
`;

const FilterContainer = styled.div`
  margin-top: 1.25rem;
  width: 25rem;
  margin-bottom: 6.25rem;
`;

const FilterContainerOnly = styled.div`
  width: 25rem;
`;

const FilterPlaceContainer = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 6.25rem;
  align-items: center;
  display: flex;
`;

const IntroSubmitBtnBox = styled.div`
  margin: auto;
`;

const IntroSubmitBtn = styled.button`
  width: 200px;
  height: 44px;

  font-size: 16px;

  background: white;
  color: black;
  border: none;
  border-radius: 5px;

  display: block;
  cursor: pointer;
`;

const IntroEditBtn = styled.div`
  width: 11.25rem;
  height: 3.125rem;

  font-size: 17.6px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1.25rem;
`;

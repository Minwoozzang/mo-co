import styled from '@emotion/styled';
import { uuidv4 } from '@firebase/util';
import { Checkbox } from 'antd';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { now } from '../../common/date';
import { db } from '../../common/firebase';
import { locations } from '../../data/locations';
import { opens } from '../../data/opens';
import { people } from '../../data/people';
import { stacks } from '../../data/stacks';
import { times } from '../../data/times';
import authState from '../../recoil/authState';
import headerToggle from '../../recoil/headerToggleState';
import useUserQuery from '../../hooks/useUserQuery';

const MateWrite = () => {
  const userDoc = useUserQuery();
  const user = useRecoilValue(authState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // 파베 인증
  const quillRef = useRef(null);
  // 글쓰기 페이지에서 유저가 입력한 데이터를 저장하는 상태
  const [partyName, setPartyname] = useState('');
  const [partyStack, setPartyStack] = useState([]);
  const [partyTime, setPartyTime] = useState('');
  const [partyNum, setPartyNum] = useState(0);
  const [partyLocation, setPartyLocation] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [partyIsOpen, setPartyIsOpen] = useState(true);
  const [partyPostTitile, setPartyPostTitle] = useState('');
  const [partyDesc, setPartyDesc] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  // 작성글 버튼 클릭 상태
  const [isClicked, setIsClicked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [teamID, setTeamID] = useState(uuidv4());
  // 리더 이미지, 팀 ID 가져오기
  const [teamIDUserInfo, setTeamIDUserInfo] = useState([]);

  const getTeamID = () => {
    const q = query(collection(db, 'user'), where('uid', '==', user?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamIDUserInfo(newInfo[0]?.teamID);
    });

    return unsubscribe;
  };

  const handlePartyStack = (stack) => {
    if (partyStack.includes(stack)) {
      setPartyStack(partyStack.filter((item) => item !== stack));
    } else if (partyStack.length < 3) {
      // 최대 3개의 기술만 선택할 수 있도록 제한
      setPartyStack([...partyStack, stack]);
    }
  };

  // 비대면 모임 체크박스 핸들러 함수
  const handleisRemote = (e) => {
    setIsRemote(!isRemote);
    setIsDisabled(!isDisabled);
  };

  // 모집글 게시 함수 (동시에 팀페이지 생성)

  const handleSubmit = useCallback(
    debounce(
      async (e) => {
        if (
          !partyName &&
          !partyStack.length &&
          !partyTime &&
          !partyNum &&
          !partyLocation &&
          !partyPostTitile &&
          !partyDesc
        ) {
          toast.warn('모임 정보를 모두 입력해주세요');
          return;
        }

        try {
          await addDoc(collection(db, 'post'), {
            partyName,
            partyStack,
            partyTime,
            partyNum,
            partyLocation,
            partyIsOpen,
            isRemote,
            partyPostTitile,
            partyDesc,
            nickName: userDoc?.nickname,
            profileImg: userDoc?.profileImg,
            createdDate: now(),
            teamID: teamID,
            uid: user?.uid,
            isDeleted: false,
            createdAt: Date.now(),
            bookmark: 0,
          })
            .then(() => {
              setDoc(doc(db, 'teamPage', teamID), {
                isDeleted: false,
                createdDate: now(),
                createdAt: Date.now(),
                teamID: teamID,
                teamLeader: {
                  teamID: teamID,
                  uid: user?.uid,
                  host: 'https://littledeep.com/wp-content/uploads/2020/03/littledeep_crown_style1.png',
                  profileImg: user?.photoURL,
                  nickName: user?.displayName,
                  isWait: false,
                  teamPosition: '리더',
                },
                teamMember: [],
                teamPartyStack: {
                  partyName,
                  partyLocation,
                  partyTime,
                  partyStack,
                },
              });
            })
            .then(() => {
              updateDoc(doc(db, 'user', user?.uid), {
                teamID: [...teamIDUserInfo, teamID],
              });
            })
            .then(() => {
              setDoc(doc(db, 'teamChat', teamID), {
                teamID: teamID,
                message: [],
              });
            })
            .catch(() => {
              toast.warn('다시 시도해주세요');
            });
          queryClient.invalidateQueries('posts');
          queryClient.invalidateQueries('teamPage'); // 진행 중 모임에 바로 반영
          toast.success('모임 개설이 완료되었습니다');
          navigate(`/mate`);
        } catch (error) {
          toast.warn('다시 시도해주세요');
        }
      },
      3000,
      { leading: true, trailing: false, maxWait: 3000 },
    ),
    [partyDesc],
  );

  useEffect(() => {
    if (user?.uid !== null) return;
    getTeamID();
  }, [user]);

  const getDebounce = useRef(
    debounce((e) => {
      setPartyname(e);
    }, 500),
  ).current;

  const handleChangePartyname = (event) => getDebounce(event.target.value);

  const [dropDownClick, setDropDownClick] = useRecoilState(headerToggle);

  return (
    <FullScreen onClick={() => setDropDownClick(false)}>
      <GuideTextsBox>
        <PageTitle>
          <h2>모각코 모임 개설</h2>
        </PageTitle>
        <PageInfo>
          모임 개설을 위해 정보와 상세한 설명을 모두 입력해주세요 🙌
          <br />
          <br />* 모집 글 작성 시, 자동으로 팀페이지가 생성됩니다.
        </PageInfo>
      </GuideTextsBox>
      <WritePageContainer>
        <EditingBox>
          <PartyInfoBox>
            <PartyTitleBox>
              <h3>모임명</h3>
              <PartyTitle
                autoFocus
                required
                type="text"
                onChange={handleChangePartyname}
                maxLength={12}
                placeholder="12자 이내로 작성해주세요"
              />
            </PartyTitleBox>

            <TechStackBox>
              <h3>기술스택 (최대 3개)</h3>
              {partyStack.length === 0 ? (
                <span
                  style={{ position: 'relative', top: 8, color: '#FEFF80' }}
                >
                  최소 1개 이상 기술을 선택해주세요!
                </span>
              ) : null}
              <TechStacks>
                {stacks.map((stack, idx) => (
                  <Tech
                    style={{
                      backgroundColor: partyStack.includes(stack)
                        ? '#FEFF80'
                        : '#212121',
                      color: partyStack.includes(stack) ? '#212121' : 'white',
                    }}
                    key={idx}
                    onClick={() => handlePartyStack(stack)}
                  >
                    {stack}
                  </Tech>
                ))}
              </TechStacks>
            </TechStackBox>

            <MeetingTimeandPeopleBox>
              <MeetingTimeBox>
                <h3 style={{ marginBottom: 20 }}>모임 시간대</h3>
                {partyTime === '' ? (
                  <span
                    style={{ position: 'relative', top: -12, color: '#FEFF80' }}
                  >
                    모임 시간대를 선택해주세요
                  </span>
                ) : null}
                <Select
                  styles={{
                    menu: (provided) => ({ ...provided, color: 'black' }),
                  }}
                  options={times}
                  placeholder={!partyTime ? '모임 시간대' : partyTime}
                  onChange={(time) => setPartyTime(time.value)}
                  value={partyTime}
                />
              </MeetingTimeBox>
              <PeopleBox>
                <h3 style={{ marginBottom: 20 }}>모집 인원</h3>
                {partyNum === 0 ? (
                  <span
                    style={{ position: 'relative', top: -12, color: '#FEFF80' }}
                  >
                    모임 인원을 선택해주세요
                  </span>
                ) : null}
                <Select
                  styles={{
                    menu: (provided) => ({ ...provided, color: 'black' }),
                  }}
                  options={people}
                  placeholder={!partyNum ? '모집 인원' : partyNum}
                  onChange={(num) => setPartyNum(num.value)}
                  value={partyNum}
                />
              </PeopleBox>
            </MeetingTimeandPeopleBox>

            <MeetingTimeandPeopleBox>
              <MeetingTimeBox>
                <h3 style={{ marginBottom: 20 }}>모집 여부</h3>
                {partyIsOpen === true ? (
                  <span
                    style={{ position: 'relative', top: -12, color: '#a4a4a4' }}
                  >
                    모집 중으로 기본 설정됩니다
                  </span>
                ) : null}
                <Select
                  styles={{
                    menu: (provided) => ({ ...provided, color: 'black' }),
                  }}
                  options={opens}
                  placeholder={partyIsOpen === true ? '모집 중' : '모집 완료'}
                  onChange={(open) => setPartyIsOpen(open.value)}
                  value={partyIsOpen}
                />
              </MeetingTimeBox>
              <PeopleBox>
                <h3 style={{ display: 'inline' }}>모집 지역</h3>
                <Checkbox
                  style={{ marginBottom: 20, marginLeft: 10, color: 'white' }}
                  onChange={handleisRemote}
                >
                  비대면을 원해요
                </Checkbox>
                {partyLocation === '' && isRemote === false ? (
                  <div
                    style={{ position: 'relative', top: -12, color: '#FEFF80' }}
                  >
                    모임 지역을 선택해주세요
                  </div>
                ) : null}
                <Select
                  styles={{
                    menu: (provided) => ({ ...provided, color: 'black' }),
                  }}
                  options={locations}
                  placeholder={!partyLocation ? '모집 지역' : partyLocation}
                  onChange={(loc) => setPartyLocation(loc.value)}
                  value={partyLocation}
                  isDisabled={isDisabled}
                />
              </PeopleBox>
            </MeetingTimeandPeopleBox>
          </PartyInfoBox>

          <EditorBox>
            <PostTitleBox>
              <h3 style={{ marginBottom: 20 }}>모집글 제목</h3>
              <PostTitle
                required
                type="text"
                value={partyPostTitile}
                onChange={(e) => setPartyPostTitle(e.target.value)}
                placeholder="글 제목을 작성하세요"
              ></PostTitle>
            </PostTitleBox>
            <h3 style={{ marginBottom: 20 }}>모임 설명</h3>
            {partyDesc === '' ? (
              <span
                style={{ position: 'relative', top: -12, color: '#FEFF80' }}
              >
                보다 자세한 설명을 작성하면 모임 결성에 도움이 됩니다
              </span>
            ) : null}
            <ReactQuill
              style={{ backgroundColor: 'white', color: 'black' }}
              value={partyDesc}
              onChange={setPartyDesc}
              ref={quillRef}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                  ],
                ],
              }}
            />
          </EditorBox>

          <WriteButtonBox>
            <WriteButton
              onClick={() => {
                setIsClicked(!isClicked);
                handleSubmit();
              }}
              style={{
                backgroundColor: isClicked ? '#f7f7f7' : '#FEFF80',
              }}
            >
              작성 완료
            </WriteButton>
          </WriteButtonBox>
        </EditingBox>
      </WritePageContainer>
    </FullScreen>
  );
};

export default MateWrite;

const FullScreen = styled.body`
  background-color: black;
  min-height: 100vh;
  min-width: 39.875rem;
`;

const Deco = styled.div`
  color: #80ffe9;
  max-width: 977px;
  margin: auto;
`;

const GuideTextsBox = styled.div`
  max-width: 977px;
  margin: auto;
  padding: 45px;
  color: white;
`;

const PageTitle = styled.div`
  margin-bottom: 20px;
`;

const PageInfo = styled.div``;

const WritePageContainer = styled.div`
  max-width: 977px;
  margin: auto;
  padding: 45px;
  color: white;
  background-color: #212121;
  border-radius: 20px;
`;

const EditingBox = styled.div``;

const PartyInfoBox = styled.div`
  margin-bottom: 40px;
`;

const PartyTitleBox = styled.div`
  margin-bottom: 40px;
`;

const PartyTitle = styled.input`
  border: 1px solid #3b3b3b;
  border-radius: 10px;
  outline-style: none;
  width: 100%;
  margin-top: 20px;
  font-size: 15px;
  padding: 10px;
  background-color: #212121;
  color: white;
`;

const TechStackBox = styled.div`
  margin-bottom: 40px;
`;

const TechStacks = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tech = styled.div`
  border-radius: 30px;
  border: 1px solid #3b3b3b;
  color: #ffffff;
  font-size: 15px;
  text-align: center;
  padding: 12px 0;
  width: 130px;
  cursor: pointer;
`;

const MeetingTimeandPeopleBox = styled.div`
  display: flex;
  gap: 170px;
  margin-bottom: 40px;
`;

const MeetingTimeBox = styled.div`
  width: 300px;
`;

const PeopleBox = styled.div`
  align-items: center;
  width: 300px;
`;

const PostTitleBox = styled.div`
  margin-bottom: 40px;
`;
const PostTitle = styled.input`
  border: 1px solid #3b3b3b;
  border-radius: 10px;
  background-color: #212121;
  outline-style: none;
  font-size: 15px;
  padding: 10px;
  width: 100%;
  color: white;
`;

const EditorBox = styled.div``;

const WriteButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const WriteButton = styled.button`
  width: 200px;
  height: 44px;
  padding: 12px 30px 13px;
  margin: auto;
  font-size: 16px;
  border-radius: 5px;
  border: none;
`;

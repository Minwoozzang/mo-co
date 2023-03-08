import styled from '@emotion/styled';
import { Checkbox } from 'antd';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { authService, db } from '../../common/firebase';
import { locations } from '../../data/locations';
import { opens } from '../../data/opens';
import { people } from '../../data/people';
import { stacks } from '../../data/stacks';
import { times } from '../../data/times';

const MateEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [postData, setPostData] = useState([]);

  // 파베 인증
  const currentUser = authService.currentUser;
  const quillRef = useRef(null);
  // 글쓰기 페이지에서 유저가 입력한 데이터를 저장하는 상태
  const [partyName, setPartyname] = useState('');
  const [partyStack, setPartyStack] = useState([]);
  console.log('🚀 ~ file: MateEdit.jsx:35 ~ partyName:', partyName);
  const [partyTime, setPartyTime] = useState('');
  const [partyNum, setPartyNum] = useState('');
  const [partyLocation, setPartyLocation] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [partyIsOpen, setPartyIsOpen] = useState(true);
  const [partyPostTitile, setPartyPostTitle] = useState('');
  const [partyDesc, setPartyDesc] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  // 작성글 버튼 클릭 상태
  const [isClicked, setIsClicked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  // !
  const [selectedTech, setSelectedTech] = useState([]);
  const [changedDesc, setChangedDesc] = useState('');
  const [writtenDesc, setWrittenDesc] = useState('');
  const [postIdInfo, setPostIdInfo] = useState([]);

  const getPostData = async () => {
    const postRef = await doc(db, 'post', id);
    getDoc(postRef)
      .then((doc) => {
        if (doc.exists()) {
          setPostIdInfo(doc.data().teamID);
          console.log('문서:', doc.data());
          setPostData(doc.data());
          setPartyname(doc.data().partyName);
          setPartyTime(doc.data().partyTime);
          setPartyNum(doc.data().partyNum);
          setPartyLocation(doc.data().partyLocation);
          setIsRemote(doc.data().isRemote);
          setPartyIsOpen(doc.data().partyIsOpen);
          setPartyPostTitle(doc.data().partyPostTitile);
          setSelectedTech(doc.data().partyStack);
          setWrittenDesc(doc.data().partyDesc);
        } else {
          console.log('문서 찾기 실패');
        }
      })
      .catch((error) => {
        console.log('에러', error);
      });
  };

  // 기술 스택 선택 핸들러 함수
  const handlePartyStack = (stack) => {
    console.log(stack);
    if (selectedTech.includes(stack)) {
      setSelectedTech(selectedTech.filter((item) => item !== stack));
    } else if (selectedTech.length < 3) {
      setSelectedTech([...selectedTech, stack]);
    }
  };

  // 비대면 모임 체크박스 핸들러 함수
  const handleisRemote = (e) => {
    setIsRemote(!isRemote);
    setIsDisabled(!isDisabled);
  };

  // ! 모집글 수정 함수
  const handleEditPost = async () => {
    try {
      await updateDoc(doc(db, 'post', id), {
        partyName,
        partyStack: selectedTech,
        partyTime,
        partyNum,
        partyLocation,
        partyIsOpen,
        isRemote,
        partyPostTitile,
        partyDesc: writtenDesc,
      })
        .then(() => {
          updateDoc(doc(db, 'teamPage', postIdInfo), {
            teamPartyStack: {
              partyName,
              partyTime,
              partyLocation,
            },
          });
        })
        .catch((error) => {
          console.log('에러남', error);
        });
      queryClient.invalidateQueries('posts');
      navigate(`/matedetail/${id}`);
      console.log('수정 성공');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    getPostData();
    console.log(currentUser);
  }, []);

  return (
    <WritePageContainer>
      <GuideTextsBox>
        <PageTitle>
          <h2>모임 글 수정하기</h2>
        </PageTitle>
      </GuideTextsBox>
      <EditingBox>
        <PartyInfoBox>
          <PartyTitleBox>
            <h3>모임명</h3>
            <PartyTitle
              type="text"
              // value={partyName}
              onChange={(e) => setPartyname(e.target.value)}
              maxLength={10}
              placeholder={postData.partyName}
              // defaultValue={postData.partyName}
            />
          </PartyTitleBox>

          <TechStackBox>
            <h3>기술스택</h3>
            <TechStacks>
              {/* 기존 선택 기술을 어떻게 보여주지? */}
              {stacks.map((stack, idx) => (
                <Tech
                  style={{
                    backgroundColor: selectedTech.includes(stack)
                      ? '#FEFF80'
                      : 'white',
                    color: selectedTech.includes(stack) ? '#212121' : '',
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
              <Select
                options={times}
                placeholder={!partyTime ? postData.partyTime : partyTime}
                onChange={(time) => setPartyTime(time.value)}
                value={partyTime}
              />
            </MeetingTimeBox>
            <PeopleBox>
              <h3 style={{ marginBottom: 20 }}>모집 인원</h3>
              <Select
                options={people}
                placeholder={!partyNum ? postData.partyNum : partyNum}
                onChange={(num) => setPartyNum(num.value)}
                value={partyNum}
              />
            </PeopleBox>
          </MeetingTimeandPeopleBox>

          <MeetingTimeandPeopleBox>
            <MeetingTimeBox>
              <h3 style={{ marginBottom: 20 }}>모집 여부</h3>
              <Select
                options={opens}
                // 모집 중 다시 보기
                placeholder={partyIsOpen === true ? '모집 중' : '모집 완료'}
                onChange={(open) => setPartyIsOpen(open.value)}
                value={partyIsOpen}
              />
            </MeetingTimeBox>
            <PeopleBox>
              <h3 style={{ display: 'inline' }}>모집 지역</h3>
              <Checkbox
                style={{ marginBottom: 20, marginLeft: 10 }}
                onChange={handleisRemote}
                defaultChecked={postData.isRemote}
              >
                비대면을 원해요
              </Checkbox>
              <Select
                options={locations}
                placeholder={
                  !partyLocation ? postData.partyLocation : partyLocation
                }
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
              type="text"
              // value={partyPostTitile}
              onChange={(e) => setPartyPostTitle(e.target.value)}
              placeholder="글 제목을 작성하세요"
              defaultValue={postData.partyPostTitile}
            ></PostTitle>
          </PostTitleBox>
          <h3 style={{ marginBottom: 20 }}>모임 설명</h3>

          <ReactQuill
            value={writtenDesc}
            onChange={(value) => setWrittenDesc(value)}
            on
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
            onClick={(e) => {
              e.preventDefault();
              setIsClicked(!isClicked);
              handleEditPost();
            }}
            style={{
              backgroundColor: isClicked ? '#f7f7f7' : '#FEFF80',
            }}
            type="submit"
          >
            수정 완료하기
          </WriteButton>
        </WriteButtonBox>
      </EditingBox>
    </WritePageContainer>
  );
};

export default MateEdit;

const WritePageContainer = styled.div`
  max-width: 977px;
  margin: auto;
  padding: 45px;
`;

const GuideTextsBox = styled.div`
  margin-bottom: 50px;
`;

const PageTitle = styled.div`
  margin-bottom: 20px;
`;

const PageInfo = styled.div``;

const EditingBox = styled.form``;

const PartyInfoBox = styled.div`
  margin-bottom: 40px;
`;

const PartyTitleBox = styled.div`
  margin-bottom: 40px;
`;

const PartyTitle = styled.input`
  border-style: none;
  border-bottom: 0.5px solid #b9b9b9;
  outline-style: none;
  width: 877px;
  margin-top: 20px;
  font-size: 15px;
  padding: 10px 0;
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
  border: 1px solid #696969;
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
  border-style: none;
  border-bottom: 0.5px solid #b9b9b9;
  outline-style: none;
  font-size: 15px;
  padding: 10px 0;
  width: 877px;
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

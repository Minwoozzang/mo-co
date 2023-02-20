import styled from '@emotion/styled';
import { useState } from 'react';
import { authService } from '../../common/firebase';
import TeamListCategory from '../../components/teamList/TeamListCategory';
import CardSection from '../../shared/CardSection';

const TeamList = () => {
  const currentUser = authService.currentUser;
  const testdata = [
    {
      name: '진행 중인 모임',
      partyLocation: '마포구',
      bookmark: 1,
      partyPostTitile: '제목1',
      partyDesc: '설명1',
      partyStack: ['React', 'Python'],
      partyIsOpen: true,
      partyNum: '3명',
      nickName: '닉네임1',
      isApplied: true,
    },
    {
      name: '참여 신청 모임',
      partyLocation: '용산구',
      bookmark: 2,
      partyPostTitile: '제목2',
      partyDesc: '설명2',
      partyStack: ['js', 'node'],
      partyIsOpen: true,
      partyNum: '2명',
      nickName: '닉네임2',
      isApplied: false,
    },
    {
      name: '진행 중인 모임',
      partyLocation: '종로구',
      bookmark: 3,
      partyPostTitile: '제목3',
      partyDesc: '설명3',
      partyStack: ['Spring', 'Java'],
      partyIsOpen: false,
      partyNum: '4명',
      nickName: '닉네임3',
      isApplied: false,
    },
    {
      name: '참여 신청 모임',
      partyLocation: '용산구',
      bookmark: 4,
      partyPostTitile: '제목4',
      partyDesc: '설명4',
      partyStack: ['React', 'Next.js'],
      partyIsOpen: true,
      partyNum: '3명',
      nickName: '닉네임4',
      isApplied: true,
    },
    {
      name: '진행 중인 모임',
      partyLocation: '노원구',
      bookmark: 5,
      partyPostTitile: '제목5',
      partyDesc: '설명5',
      partyStack: ['React', 'Next.js'],
      partyIsOpen: true,
      partyNum: '2명',
      nickName: '닉네임5',
      isApplied: true,
    },
  ];
  const [testList, setTestList] = useState(testdata);
  const [testcategory, setTestcategory] = useState([
    {
      name: '진행 중인 모임',
      isClicked: true,
    },
    {
      name: '참여 신청 모임',
      isClicked: false,
    },
  ]);

  const onClickedMeeting = (name) => {
    if (name === '진행 중인 모임') {
      const clickedCategory = testcategory.map((obj) => {
        return { ...obj, isClicked: !obj.isClicked };
      });
      setTestcategory(clickedCategory);
      setTestList(testdata.filter((item) => item.isApplied === false));
    } else {
      const clickedCategory = testcategory.map((obj) => {
        return { ...obj, isClicked: !obj.isClicked };
      });
      setTestcategory(clickedCategory);
      setTestList(testdata.filter((item) => item.isApplied === true));
    }
  };
  console.log(testdata.filter((item) => item.isApplied === false));

  return (
    <TeamListContainer>
      <UserMeetingTitle>xxx님의 코딩모임</UserMeetingTitle>
      <MeetingCategory>
        {testcategory.map((item, idx) => (
          <TeamListCategory
            key={idx}
            item={item}
            onClickedMeeting={onClickedMeeting}
          />
        ))}
      </MeetingCategory>
      <CardContainer>
        {testList.map((item, idx) => (
          <CardSection key={idx} item={item} />
        ))}
      </CardContainer>
    </TeamListContainer>
  );
};

export default TeamList;

const TeamListContainer = styled.div`
  width: 1178px;
  margin: 0 auto;
  background-color: #d7e5f1;
`;
const UserMeetingTitle = styled.div`
  width: 233px;
  height: 40px;
  margin-top: 90px;
  font-size: 30px;
  font-weight: 500;
`;
const MeetingCategory = styled.div`
  /* width: 250px; */
  height: 44px;
  display: flex;
  gap: 0 30px;
  margin-top: 50px;
  /* background-color: #83c0f1; */
`;
const CardContainer = styled.div`
  width: 1178px;
  margin-top: 40px;
  display: flex;
  gap: 20px 20px;
  flex-wrap: wrap;
  background-color: #c9dff3;
`;

import styled from '@emotion/styled';

const TeamListCategory = ({ item, isClickedMeeting }) => {
  const { isClicked, name } = item;
  
  return (
    <MeetingTextBox borderbottom={isClicked}>
      <MeetingText
        fontweight={isClicked}
        onClick={isClickedMeeting}
      >{name}</MeetingText>
    </MeetingTextBox>
  );
};

export default TeamListCategory;

const MeetingTextBox = styled.div`
  height: 44px;
  /* width: 110px; */
  display: flex;
  align-items: center;
  // 클릭했을 때 border-bottom 보이게 하기
  border-bottom: ${(props) => (props.borderbottom ? '2px solid' : '0px')};
`;
const MeetingText = styled.div`
  /* width: 110px; */
  height: 24px;
  font-size: 16px;
  cursor: pointer;
  // 클릭했을 때 font-weight 600
  font-weight: ${(props) => (props.fontweight ? 600 : 400)};
`;

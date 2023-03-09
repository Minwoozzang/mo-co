import styled from '@emotion/styled';

const NotiCategoryList = ({ item, isClickedMeeting }) => {
  const { isClicked, name } = item;
  return (
    <MeetingTextBox borderbottom={isClicked}>
      <MeetingText
        fontcolor={isClicked}
        fontweight={isClicked}
        onClick={isClickedMeeting}
      >
        {name}
      </MeetingText>
    </MeetingTextBox>
  );
};

export default NotiCategoryList;

const MeetingTextBox = styled.div`
  height: 30px;
  /* width: 110px; */
  display: flex;
  align-items: center;
  // 클릭했을 때 border-bottom 보이게 하기
  border-bottom: ${(props) =>
    props.borderbottom ? '2px solid #FEFF80' : '0px'};
`;
const MeetingText = styled.div`
  /* width: 110px; */
  height: 20px;
  font-size: 1.0rem;
  color: ${(props) => (props.fontcolor ? '#FFFFFF' : '#858585')};
  cursor: pointer;
  // 클릭했을 때 font-weight 600
  font-weight: ${(props) => (props.fontweight ? 600 : 400)};
`;

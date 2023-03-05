import styled from "@emotion/styled";

const LeaderGotMessage = ({ item }) => {
  const { teamMember, teamLeader, teamPartyStack } = item;
  return (
    <div>
      {teamMember.length > 0
        ? teamMember
            .filter((team) => team.isWait === true)
            .map((member, idx) => 
                <ContentBox key={idx}>
                    <PartyName>{teamPartyStack.partyName}</PartyName>
                    {member.nickName}님이 {teamLeader.nickName}님 모임에 참여신청 하였습니다.
                </ContentBox>)
        : ''}
    </div>
  );
};

export default LeaderGotMessage;

const ContentBox = styled.div`
  margin-bottom: 5px;
`;
const PartyName = styled.div`
    color: #FEFF80;
    font-weight: 500;
`;

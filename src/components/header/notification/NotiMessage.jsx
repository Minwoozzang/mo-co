import styled from '@emotion/styled';
import { authService } from '../../../common/firebase';

const NotiMessage = ({ item }) => {
  const { teamMember, teamLeader, teamPartyStack } = item;
  // console.log(teamMember.isRead)
  

  return (
    <Container>
      {teamMember
        .filter((team) => team.uid === authService?.currentUser?.uid &&
          team.isRead === false
        )
        .map((member, idx) => (
          <div key={idx}>
            {member.isWait ? (
              ''
            ) : (
              <ContentBox>
                <StackPartyName>{teamPartyStack.partyName}</StackPartyName>
                {teamLeader.nickName}님의 모임에 참여되었습니다.
              </ContentBox>
            )}
          </div>
        ))}
    </Container>
  );
};

export default NotiMessage;

const Container = styled.div`
  /* margin-right: 10px; */
`;
const ContentBox = styled.div`
  margin-bottom: 5px;
`
const StackPartyName = styled.div`
  font-weight: 500;
  color: #FEFF80;
`;
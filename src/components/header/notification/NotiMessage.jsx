import styled from '@emotion/styled';
import { doc, updateDoc } from 'firebase/firestore';
import { authService, db } from '../../../common/firebase';

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
                <StackPartyName>
                  {teamPartyStack.partyName}
                  <IsReadBtn>
                    읽음
                  </IsReadBtn>
                </StackPartyName>
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
const IsReadBtn = styled.button`
  cursor: pointer;
  margin-left: 10px;
  background-color: #3b3b3b;
  border: none;
  color: #ffffff;
  :hover {
    background-color: #b6b6b6;
  }
`
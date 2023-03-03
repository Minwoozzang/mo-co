import styled from "@emotion/styled";
import { authService } from "../../../common/firebase";

const NotiMessage = ({ item }) => {
    const { teamMember } = item;

    return (
        <Box>
            알림메세지 내역 :<br/>
        {teamMember.filter(team => team.uid === authService?.currentUser?.uid)
            .map((member, idx)=> (
        <div key={idx}>
            {member.isWait ? 'aa' : <div>알림메세지</div>}
        </div>
        ))
        }
        </Box>
    );
};

export default NotiMessage;

const Box = styled.div`
    /* margin-right: 10px; */
`
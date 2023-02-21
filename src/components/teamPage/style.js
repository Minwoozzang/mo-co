import styled from '@emotion/styled';

export const MemberSidebar = styled.div`
  width: 220px;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition-duration: 0.2s;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const MemberInfoTitle = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 19px;
  font-weight: 600;
  line-height: 34px;
  position: sticky;
  top: 0;

  &::after {
    content: '';
    position: absolute;
    top: -30px;
    left: 0;
    background: var(--theme-bg);
    width: 150px;
    height: 270px;
    z-index: -1;
    /* background-color: black; */
  }
`;

export const SideWrapper = styled.div`
  border-bottom: 1px solid var(--border-color);
  padding: 36px 0;
  width: 145px;
  position: sticky;
  top: 40px;
`;

export const MemberInfoProfileTitle = styled.div`
  font-size: 15px;
  letter-spacing: 0.07em;
  margin-bottom: 24px;
  color: white;
`;

export const MembersInfoProfileTitle = styled.div`
  font-size: 15px;
  letter-spacing: 0.07em;
  margin-bottom: 24px;
  color: white;
  position: sticky;
  top: 205px;
`;

export const MemberInfoProfile = styled.div`
  align-items: center;
  display: flex;
  min-width: 0;
  margin-bottom: 20px;
`;

export const MemberInfoProfileImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: 1px solid black;
  object-fit: cover;
`;

export const MemberInfoProfileInfo = styled.div`
  margin-left: 15px;
  overflow: hidden;
  color: #fff;
`;

export const MemberInfoProfileName = styled.div`
  font-size: 18px;
  font-weight: 550;
`;

export const MemberInfoProfilePosition = styled.p`
  font-size: 13px;
  display: flex;
  margin-top: 2px;
`;

// 팀장
export const LeaderInfoProfile = styled.div``;
export const HostBox = styled.div`
  width: 60px;

  display: flex;
  justify-content: flex-end;
`;
export const MemberInfoHost = styled.img`
  width: 20px;
  height: 20px;
`;
export const LeaderBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;
export const LeaderImgBox = styled.div``;
export const LeaderProfileInfo = styled.div`
  margin-left: 20px;

  color: white;
`;
export const LeaderName = styled.div`
  font-size: 20px;
`;
export const LeaderPosition = styled.div``;
export const MemberList = styled.div``;

// 대기멤버
export const WaitMember = styled.div`
  margin-top: 250px;
`;
export const WaitMemberTitle = styled.div`
  color: white;
`;
export const WaitMemberListBox = styled.div`
  margin-top: 20px;
`;

export const WaitProfileInfo = styled.div`
  width: 110px;
  height: 45px;

  color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-left: 15px;
`;

export const WaitChangeIcon = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

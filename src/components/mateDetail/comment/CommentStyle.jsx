import styled from '@emotion/styled';

export const CommentContainer = styled.div`
  margin: 5rem 50rem 0 22.5rem;

  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    margin: 5rem 50rem 0 12.5rem;
    width: 50%;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 0rem 30rem 0 9.5rem;
  }
  /* 태블릿, 아이패드 */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) {
    margin: 0rem 30rem 0 3rem;
  }
`;

export const ListContainer = styled.div``;

export const CommentNickname = styled.p`
  color: #fff;
  font-weight: 600;
`;

export const CommentUserName = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #feff80;
  margin-right: 1.5%;
  margin-left: 1.5%;
  margin-bottom: 0.5%;
`;

export const CommentTime = styled.div`
  color: #555;
  margin-right: 1.5%;
`;

export const ListTextSection = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 56.25rem) {
    width: 21.875rem;
  }
  @media screen and (max-width: 48.75rem) {
    width: 36.25rem;
  }
`;

export const CommentText = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  margin-left: 1%;
  color: #fff;
  margin: 1rem 0 1rem 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const CommentUserInput = styled.input`
  width: 90%;
  box-sizing: border-box;
  border: 0.125rem solid #525252;
  border-radius: 0.625rem;
  font-size: 16px;
  padding: 1.25rem;
  margin-left: 1%;
  background-color: transparent;
  color: #fff;
  :focus {
    outline: none;
  }
`;

export const CommentTextIcon = styled.div`
  font-size: 22.4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const CommentIconBody = styled.div`
  margin-left: 18.5%;
  position: absolute;
  margin-bottom: 7.5%;
  /* 맥북 에어 */
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1440px) {
    margin-left: 48%;
    margin-bottom: 20%;
  }
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin-left: 45.5%;
    margin-bottom: 28%;
  }
  /* 태블릿, 아이패드 */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) {
    margin-left: 85%;
    margin-bottom: 38%;
  }
`;

export const UpdateDeleteBody = styled.div`
  width: 50%;
  margin-left: 110%;
`;

export const CommentDeleteBtn = styled.button`
  width: 5rem;
  height: 1.875rem;
  background-color: #3b3b3b;
  border: 0.125rem solid #3b3b3b;
  color: #fff;
  border-radius: 0.3125rem;
  font-size: 14.4px;
  font-weight: 600;
  display: block;
  margin-bottom: 0.3125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  :hover {
    background-color: #222222;
    color: #fff;
    border-radius: 0.3125rem;
    border: none;
  }
`;

export const CommentUpdateBtn = styled(CommentDeleteBtn)``;
export const CommentPoliceBtn = styled(CommentDeleteBtn)``;

export const NoneDiv = styled.div`
  display: none;
`;

export const CommentProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  background-color: #d9d9d9;
  margin-right: 0.5rem;
`;
export const CommentDate = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: #858585;
`;

export const UserHr = styled.hr`
  margin: 2.1875rem 2.5rem 0rem 0rem;
  border: 1;
  width: 45.3125rem;
  border-top: 0.0625rem solid #3b3b3b;
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    width: 31rem;
    margin-bottom: 1.25rem;
  }
  /* 태블릿, 아이패드 */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) {
    width: 43rem;
  }
`;

export const Replybutton = styled.button`
  font-size: 0.75rem;
  font-weight: 400;
  color: #858585;
  background: none;
  border: none;
`;

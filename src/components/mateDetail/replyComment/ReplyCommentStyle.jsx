import styled from '@emotion/styled';

export const ReplyWrap = styled.section`
  width: 100%;
`;

export const CommentContainer = styled.div`
  margin: 3rem 0rem 0 0rem;
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 3rem 0rem 0 0rem;
  }
`;

export const ListContainer = styled.div``;

export const CommentNickname = styled.p`
  color: #fff;
  font-weight: 600;
`;

export const CommentUserName = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
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
`;

export const CommentUserInput = styled.input`
  width: 90%;
  box-sizing: border-box;
  border: 0.125rem solid #525252;
  border-radius: 0.625rem;
  font-size: 16px;
  padding: 1.25rem;
  background-color: transparent;
  color: #fff;
  margin-left: 1%;
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
  width: 25%;
  margin-left: 69%;
  position: absolute;
  margin-left: 26.25rem;
`;

export const UpdateDeleteBody = styled.div`
  width: 50%;
  margin-left: 17.1875rem;
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
`;
export const CommentDate = styled.p`
  font-size: 0.75rem;
  font-weight: 400;
  color: #858585;
`;

export const UserHr = styled.hr`
  margin: 2.1875rem 2.5rem 2.5rem 0rem;
  border: 1;
  width: 45.3125rem;
  border-top: 0.0625rem solid #3b3b3b;
  /* 아이패드 프로 */
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) {
    margin: 0rem 2.5rem 2.5rem 0rem;
    width: 42rem;
  }
`;

export const Replybutton = styled.button`
  font-size: 0.75rem;
  font-weight: 400;
  color: #858585;
  background: none;
  border: none;
`;

import styled from '@emotion/styled';

export const CommentContainer = styled.div`
  margin: 80px 800px 0 420px;
`;

export const ListContainer = styled.div``;

export const CommentNickname = styled.p`
  color: #fff;
  font-weight: 600;
`;

export const CommentUserName = styled.p`
  font-size: 16px;
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
  @media screen and (max-width: 900px) {
    width: 350px;
  }
  @media screen and (max-width: 780px) {
    width: 580px;
  }
`;

export const CommentText = styled.p`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 1%;
  color: #fff;
  margin: 16px 0 16px 0;
`;

export const CommentUserInput = styled.input`
  width: 90%;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
  font-size: 1rem;
  margin-left: 1%;
  :focus {
    outline: none;
  }
`;

export const CommentTextIcon = styled.div`
  font-size: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const CommentIconBody = styled.div`
  width: 25%;
  margin-left: 69%;
`;

export const UpdateDeleteBody = styled.div`
  width: 50%;
  margin-left: 275px;
`;

export const CommentDeleteBtn = styled.button`
  width: 80px;
  height: 30px;
  background-color: #3b3b3b;
  border: 2px solid #3b3b3b;
  color: #fff;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  :hover {
    background-color: #222222;
    color: #fff;
    border-radius: 5px;
    border: none;
  }
`;

export const CommentUpdateBtn = styled(CommentDeleteBtn)``;
export const CommentPoliceBtn = styled(CommentDeleteBtn)``;

export const NoneDiv = styled.div`
  display: none;
`;

export const CommentProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #d9d9d9;
`;
export const CommentDate = styled.p`
  color: #fff;
`;

export const UserHr = styled.hr`
  margin: 35px 40px 0px 0px;
  border: 1;
  width: 920px;
  border-top: 1px solid #3b3b3b;
`;

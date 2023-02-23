import styled from '@emotion/styled';

export const AddCommentListAll = styled.div`
  display: flex;
`;

export const AddCommentListWrap = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid #525252;
  width: 700px;
  height: 130px;
  padding: 20px 25px 25px 20px;
  margin-top: 50px;
  box-sizing: border-box;
`;

export const AddInputDiv = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 1%;
`;

export const AddInputContent = styled.input`
  width: 100%;
  height: 100%;
  background-color: #111;
  border: none;
`;

export const AddCommentBtnDiv = styled.div``;

export const AddCommentBtn = styled.button`
  width: 120px;
  height: 35px;
  cursor: pointer;
  background-color: #545454;
  color: #fff;
  border: 1px solid #545454;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  :hover {
    background-color: #3b3b3b;
    color: #fff;
    border-radius: 5px;
    border: none;
  }
`;

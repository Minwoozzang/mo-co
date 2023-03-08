import styled from '@emotion/styled';
import { FiShare2 } from 'react-icons/fi';

export const GroupWrap = styled.div`
  height: 100%;
`;
export const GroupHeader = styled.h4`
  width: 100%;
  height: 20px;
  margin-top: 90px;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
  padding-left: 420px;
`;
export const GroupUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GroupImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: auto;
  margin-left: 420px;
`;
export const GroupUserId = styled.p`
  margin: 43px 8px 8px;
  text-align: center;
  color: #fff;
`;

export const Social = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DropdownOptions = styled(FiShare2)`
  font-size: 25px;
  margin-top: 43px;
  color: white;
  cursor: pointer;
`;

export const GroupBox = styled.div`
  width: 750px;
  height: 100%;
  min-height: 1100px;
  margin: 0 22rem 0 22rem;
  background-color: #232323;
  border-radius: 20px;
  color: #fff;
`;
export const GroupPerson = styled.div`
  width: 100%;
  padding: 90px 150px 0 50px;
  margin: 30px 0 30px 0;
`;

export const UserHr = styled.hr`
  margin-top: 24px;
  border: 0;
  height: 0;
  border-top: 1px solid #8c8c8c;
`;

export const Bookmark = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

import styled from '@emotion/styled';
import { FiShare2 } from 'react-icons/fi';

export const GroupWrap = styled.div`
  height: 100%;
`;
export const GroupHeader = styled.h4`
  width: 100%;
  height: 1.25rem;
  margin-top: 5.625rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  padding-left: 22.5rem;
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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  margin-top: auto;
  margin-left: 360px;
`;
export const GroupUserId = styled.p`
  margin: 2.6875rem 0.5rem 0.5rem;
  text-align: center;
  color: #fff;
`;

export const Social = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DropdownOptions = styled(FiShare2)`
  font-size: 1.5625rem;
  margin-top: 2.6875rem;
  color: white;
  cursor: pointer;
`;

export const GroupBox = styled.div`
  width: 47.5rem;
  height: 100%;
  min-height: 68.75rem;
  margin: 0 352px 0 352px;
  background-color: #232323;
  border-radius: 1.25rem;
  color: #fff;
`;
export const GroupPerson = styled.div`
  width: 100%;
  padding: 5.625rem 9.375rem 0 3.125rem;
  margin: 1.875rem 0 1.875rem 0;
`;

export const UserHr = styled.hr`
  margin-top: 1.5rem;
  border: 0;
  height: 0;
  border-top: 0.0625rem solid #8c8c8c;
`;

export const Bookmark = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

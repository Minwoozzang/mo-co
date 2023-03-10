import styled from '@emotion/styled';

export const MyCommentBody = styled.div`
  margin-top: 3.125rem;
  margin-left: 6.25rem;

  display: flex;
`;
export const MyCommetTitle = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: #ffffff;

  margin-right: 4.375rem;
`;
export const MyCommentList = styled.div`
  width: 35.625rem;
  height: 600px;
  overflow-y: auto;
`;

// MyComment 부분

export const MyCommentsBox = styled.div`
  width: 35.625rem;
  border-bottom: 1px solid white;
  margin-bottom: 1.25rem;
  padding: 15px;
  cursor: pointer;
`;

export const MycommentOfTitile = styled.div`
  color: #FEFF80;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const MyCommentOfComment = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.5em;
  height: 1.8em;

  color: #ffffff;
`;

export const MyCommentDate = styled.div`
  font-weight: 500;
  font-size: 0.9375rem;
  /* line-height: 1.375rem; */
  text-align: right;
  color: #b6b6b6;
  margin: 10px 0 10px 0;
`;

export const PageBox = styled.div`
  text-align: center;

  margin-left: 6.25rem;
  margin-top: 1.875rem;
`;

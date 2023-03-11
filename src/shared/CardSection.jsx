import styled from '@emotion/styled';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import BookmarkImg from '../assets/icon/Icon_Scrap.png';
import BookmarkedImg from '../assets/icon/Icon_Scrap_active.png';
import defaultImg from '../assets/icon/user.png';
import useUserQuery from '../hooks/useUserQuery';
import authState from '../recoil/authState';
import { toast } from 'react-toastify';

const CardSection = ({ item, db }) => {
  const user = useRecoilValue(authState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const bookmark = item.bookmark;
  const [partyNum, setPartyNum] = useState(0);
  const userDoc = useUserQuery();

  function debounce(func, wait) {
    let inDebounce;
    return function (props) {
      // setTimeout이 실행된 Timeout의 ID를 반환하고, clearTimeout()으로 이를 해제할 수 있음을 이용
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func(props), wait);
    };
  }

  // HTML을 plain text로 변환
  const parsedHtml = item.partyDesc?.replace(/(<([^>]+)>)/gi, '');

  // 북마크 핸들링 함수
  const handleBookmark = useCallback(
    debounce(async () => {
      if (user === null) {
        toast.warn('로그인이 필요합니다 :)');
        return;
      }

      const _userDoc = await getDoc(doc(db, 'user', user?.uid));
      const userData = _userDoc.data();
      const bookmarks = await userData.bookmarks;

      // 현재 유저의 bookmarks에 해당 게시물이 없을 때
      if (!bookmarks?.includes(item.id)) {
        try {
          await updateDoc(doc(db, 'post', item.id), {
            bookmark: bookmark + 1,
          });
          queryClient.setQueryData('posts', (oldData) => {
            // 해당 게시물의 정보를 찾아서 북마크 수를 1 증가시킵니다.
            const updatedData = oldData.map((post) => {
              if (post.id === item.id) {
                return { ...post, bookmark: post.bookmark + 1 };
              }
              return post;
            });
            queryClient.invalidateQueries(['user', user?.uid]);
            return updatedData;
          });
          // user 컬렉션의 해당 유저의 bookmarks 필드에 해당 게시물 id 추가
          await updateDoc(doc(db, 'user', user?.uid), {
            bookmarks: [...bookmarks, item.id],
          });
          queryClient.invalidateQueries(['user', user?.uid]);
          queryClient.invalidateQueries('posts');
        } catch {
          toast.warn('북마크 추가 실패');
        }
      }

      // 현재 유저의 bookmarks에 해당 게시물이 있을 때
      if (bookmarks?.includes(item.id)) {
        try {
          // post 컬렉션의 해당 게시물의 bookmark 필드 -1
          await updateDoc(doc(db, 'post', item.id), {
            bookmark: bookmark - 1,
          });
          queryClient.setQueryData('posts', (oldData) => {
            // 해당 게시물의 정보를 찾아서 북마크 수를 1 감소시킵니다.
            const updatedData = oldData.map((post) => {
              if (post.id === item.id) {
                return { ...post, bookmark: post.bookmark - 1 };
              }
              return post;
            });
            return updatedData;
          });
          // user 컬렉션의 해당 유저의 bookmarks 필드에 해당 게시물 id 삭제
          await updateDoc(doc(db, 'user', user?.uid), {
            bookmarks: bookmarks.filter((bookmark) => bookmark !== item.id),
          });
          queryClient.invalidateQueries(['user', user?.uid]);
          queryClient.invalidateQueries('posts');
        } catch {
          toast.warn('북마크 삭제 실패');
        }
      }
    }, 300),
    [bookmark],
  );

  const getPartyNum = async () => {
    const userDoc = await getDoc(doc(db, 'teamPage', item.teamID));
    const teamDoc = userDoc.data();
    setPartyNum(
      userDoc.data()?.teamMember.filter((item) => item.isWait === false).length,
    );
  };

  useEffect(() => {
    getPartyNum();
  }, []);

  return (
    <PostCard>
      <BookmarkIconBox>
        <LoactionAndTimeBox>
          <Location>{item.isRemote ? '비대면' : item.partyLocation}</Location>
          <Time>{item.partyTime}</Time>
        </LoactionAndTimeBox>
        {/* <span>{item.bookmark}</span> */}
        <Bookmark>
          <span>{item.bookmark}</span>
          <BookmarkIcon onClick={handleBookmark}>
            {userDoc?.bookmarks?.includes(item.id) ? (
              <img src={BookmarkedImg} alt="bookmarked" width="20px" />
            ) : (
              <img src={BookmarkImg} alt="bookmark" width="20px" />
            )}
          </BookmarkIcon>
        </Bookmark>
      </BookmarkIconBox>

      <PostBox>
        <PostTitle
          onClick={() => {
            navigate(`/matedetail/${item.id}`, { state: { item } });
          }}
        >
          {item.partyPostTitile}
        </PostTitle>
        <PostDesc>{parsedHtml}</PostDesc>
        <TechStackIcon>
          {item.partyStack?.map((item, idx) => (
            <img
              key={idx}
              src={require(`../assets/stack/${item}.png`)}
              alt={item}
              style={{ width: 30, height: 30, marginRight: 5 }}
            />
          ))}
        </TechStackIcon>
      </PostBox>

      <HorizontalLine />

      <PartyStatusBox>
        <RecruitingBox>
          <Recruiting>모집 현황</Recruiting>
        </RecruitingBox>
        <HeadCountBox>
          {item.partyIsOpen === true ? (
            <span style={{ color: '#80FFE9' }}>모집중 &nbsp; </span>
          ) : (
            <span style={{ color: '#FF80BF' }}>모집완료 &nbsp; </span>
          )}
          <HeadCount>{`: ${partyNum + 1} / ${item.partyNum + 1}`}</HeadCount>
        </HeadCountBox>
      </PartyStatusBox>

      <PostInfo>
        <ProfileBox>
          <ProfileImage
            src={!item.profileImg ? defaultImg : item.profileImg}
          ></ProfileImage>
          <NickName>{item.nickname}</NickName>
        </ProfileBox>
        <InfoBox>
          {/* <GrFormView size="24px" />
          <PostView>12</PostView>
          <FaRegCommentDots size="15px" />
          <PostComments>3</PostComments> */}
        </InfoBox>
      </PostInfo>
    </PostCard>
  );
};

export default CardSection;

const PostCard = styled.div`
  /* border: 1px solid black; */
  border-radius: 20px;
  flex-basis: 245px;
  padding: 24px;
  flex-grow: 0;
  flex-shrink: 0;
  width: 280px;
  height: 234px;
  display: flex;
  flex-direction: column;
  background-color: #232323;
  border: 1px solid #3b3b3b;
`;

const BookmarkIconBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
`;

const LoactionAndTimeBox = styled.div`
  display: flex;
  gap: 6px;
`;

const Location = styled.div`
  width: 85px;
  height: 26px;
  color: white;
  background-color: black;
  border-radius: 20px;
  text-align: center;
  line-height: 26px;
`;

const Time = styled.div`
  width: 80px;
  height: 26px;
  color: white;
  background-color: black;
  border-radius: 20px;
  text-align: center;
  line-height: 26px;
`;

const Bookmark = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
`;

const BookmarkIcon = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:active {
    transform: scale(0.7);
  }
`;

const PostBox = styled.div`
  margin-bottom: 22px;
  display: inline-block;
  width: 24%;
  margin: 2%;
`;

const PostTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  width: 245px;
  height: 24px;
  cursor: pointer;
  font-size: 1.3em;
  color: white;
  font-weight: 600;
  &:hover {
    color: #feff80;
  }
`;

const PostDesc = styled.div`
  display: inline-block;
  width: 240px;
  height: 20px;
  margin-bottom: 20px;
  color: #b6b6b6;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  margin-top: 6px;
`;

const PartyStatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const HeadCountBox = styled.div`
  display: flex;
  align-items: center;
`;

const HeadCount = styled.div`
  font-size: 15px;
  color: white;
`;

const RecruitingBox = styled.div`
  display: flex;
  align-items: center;
`;

const Recruiting = styled.div`
  font-size: 15px;
  color: #6c6c6c;
`;

const TechStackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 240px;
  margin-bottom: 16px;
`;

const HorizontalLine = styled.div`
  border: 0.1px solid #3b3b3b;
  width: 100%;
  margin: auto;
  color: #3b3b3b;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  position: relative;
  left: -25px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  object-fit: scale-down;
`;

const NickName = styled.div`
  width: 70px;
  height: 20px;
  font-size: 15px;
  color: white;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const PostView = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 15px;
`;

const PostComments = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: 15px;
`;

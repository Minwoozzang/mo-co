import styled from '@emotion/styled';
import { BsBookmarkHeart } from 'react-icons/bs';
import { GrFormView } from 'react-icons/gr';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../common/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import default_profile from '../assets/default_profile.png';

const CardSection = ({ item, db }) => {
  const navigate = useNavigate();
  const [uid, setUid] = useState('');
  const bookmark = item.bookmark;

  // HTML을 plain text로 변환
  const parsedHtml = item.partyDesc.replace(/(<([^>]+)>)/gi, '');

  // 북마크 핸들링 함수
  const handleBookmark = async () => {
    // 현재 유저 문서 가져오기
    const userDoc = await getDoc(doc(db, 'user', uid));
    const userData = userDoc.data();
    const bookmarks = await userData.bookmarks;

    // 현재 유저의 bookmarks에 해당 게시물이 없을 때
    if (!bookmarks.includes(item.id)) {
      try {
        // post 컬렉션의 해당 게시물의 bookmark 필드 +1
        await updateDoc(doc(db, 'post', item.id), {
          bookmark: bookmark + 1,
        });
        // user 컬렉션의 해당 유저의 bookmarks 필드에 해당 게시물 id 추가
        await updateDoc(doc(db, 'user', uid), {
          bookmarks: [...bookmarks, item.id],
        });
        console.log('북마크 추가 성공');
      } catch {
        console.log('북마크 추가 실패');
      }
    }

    // 현재 유저의 bookmarks에 해당 게시물이 있을 때
    if (bookmarks.includes(item.id)) {
      try {
        // post 컬렉션의 해당 게시물의 bookmark 필드 -1
        await updateDoc(doc(db, 'post', item.id), {
          bookmark: bookmark - 1,
        });
        // user 컬렉션의 해당 유저의 bookmarks 필드에 해당 게시물 id 삭제
        await updateDoc(doc(db, 'user', uid), {
          bookmarks: bookmarks.filter((bookmark) => bookmark !== item.id),
        });
        console.log('북마크 삭제 성공');
      } catch {
        console.log('북마크 삭제 실패');
      }
    }
  };
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
      } else {
        return;
      }
    });
  }, [uid]);

  return (
    <PostCard>
      <BookmarkIconBox>
        <Location>{item.partyLocation}</Location>
        {/* <span>{item.bookmark}</span> */}
        <Bookmark>
          <span>{item.bookmark}</span>
          <BsBookmarkHeart
            onClick={handleBookmark}
            cursor="pointer"
            size="20px"
          />
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
          {item.partyStack.map((item, idx) => (
            <Tag key={idx} style={{ fontSize: 12 }} color="purple">
              {item}
            </Tag>
          ))}
        </TechStackIcon>
      </PostBox>

      <PartyStatusBox>
        <RecruitingBox>
          <Recruiting>
            {item.partyIsOpen === true ? (
              <span style={{ color: 'green' }}>모집 중</span>
            ) : (
              <span style={{ color: 'red' }}>모집완료</span>
            )}
          </Recruiting>
        </RecruitingBox>
        <HeadCountBox>
          <BsPeopleFill size="15px" />
          <HeadCount>{`: 1 / ${item.partyNum}`}</HeadCount>
        </HeadCountBox>
      </PartyStatusBox>

      <HorizontalLine />

      <PostInfo>
        <ProfileBox>
          <ProfileImage
            src={!item.profileImg ? default_profile : item.profileImg}
          ></ProfileImage>
          <NickName>{item.nickName}</NickName>
        </ProfileBox>
        <InfoBox>
          <GrFormView size="24px" />
          <PostView>12</PostView>
          <FaRegCommentDots size="15px" />
          <PostComments>3</PostComments>
        </InfoBox>
      </PostInfo>
    </PostCard>
  );
};

export default CardSection;

const PostCard = styled.div`
  border: 1px solid black;
  flex-basis: 245px;
  padding: 16px;
  flex-grow: 0;
  flex-shrink: 0;
  width: 280px;
  height: 320px;
  display: flex;
  flex-direction: column;
`;

const BookmarkIconBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
`;

const Location = styled.div`
  width: 62px;
  height: 16px;
  color: #4f4f4f;
`;

const Bookmark = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
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
  font-size: 17px;
  &:hover {
    color: #531cab;
  }
`;

const PostDesc = styled.div`
  display: inline-block;
  width: 240px;
  height: 20px;
  margin-bottom: 20px;
  color: #828282;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const PartyStatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
`;

const HeadCountBox = styled.div`
  display: flex;
  align-items: center;
`;

const HeadCount = styled.div`
  font-size: 15px;
`;

const RecruitingBox = styled.div`
  display: flex;
  align-items: center;
`;

const Recruiting = styled.div`
  font-size: 15px;
`;

const TechStackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 240px;
  margin: 43px 0;
`;

const HorizontalLine = styled.div`
  border: 0.5px solid grey;
  width: 100%;
  margin: auto;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  background-color: grey;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const NickName = styled.div`
  width: 70px;
  height: 20px;
  font-size: 15px;
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

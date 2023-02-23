import styled from '@emotion/styled';
import { BsBookmarkHeart } from 'react-icons/bs';
import { GrFormView } from 'react-icons/gr';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';

const BlurCard = ({ item }) => {

  return (
    <PostCard>
      <BookmarkIconBox>
        <Location>용산구</Location>
        <Bookmark>
          <BsBookmarkHeart
            cursor="pointer"
            size="20px"
          />
        </Bookmark>
      </BookmarkIconBox>

      <PostBox>
        <PostTitle>
          모임제목
        </PostTitle>
        <PostDesc>모임설명</PostDesc>
        <TechStackIcon>
        </TechStackIcon>
      </PostBox>

      <PartyStatusBox>
        <RecruitingBox>
          <Recruiting>
            모집중
          </Recruiting>
        </RecruitingBox>
        <HeadCountBox>
          <BsPeopleFill size="15px" />
          <HeadCount>2 / 3명</HeadCount>
        </HeadCountBox>
      </PartyStatusBox>

      <HorizontalLine />

      <PostInfo>
        <ProfileBox>
          <ProfileImage
            // src={default_profile}
          ></ProfileImage>
          <NickName>XXX</NickName>
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

export default BlurCard;

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
  background-color: rgba(238, 238, 232, 0.1);
  filter: blur(5px);
  -webkit-filter: blur(5px);
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
  font-size: 17px;
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

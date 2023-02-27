import styled from '@emotion/styled';
import { BsBookmarkHeart } from 'react-icons/bs';
import { GrFormView } from 'react-icons/gr';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsPeopleFill } from 'react-icons/bs';
import defaultImg from '../../../assets/Group 290.png';

const BlurCard = ({ item }) => {

  return (
    <PostCard>
      <BookmarkIconBox>
        <LoactionAndTimeBox>
          <Location>대면</Location>
          <Time>주말/오후</Time>
        </LoactionAndTimeBox>
        {/* <span>{item.bookmark}</span> */}
        <Bookmark>
          
          <BsBookmarkHeart
            cursor="pointer"
            size="20px"
            color="white"
          />
        </Bookmark>
      </BookmarkIconBox>

      <PostBox>
        <PostTitle>
          모임제목
        </PostTitle>
        <PostDesc>모임설명</PostDesc>
        <TechStackIcon>
          OOO
        </TechStackIcon>
      </PostBox>

      <HorizontalLine />

      <PartyStatusBox>
        <RecruitingBox>
          <Recruiting>모집 현황</Recruiting>
        </RecruitingBox>
        <HeadCountBox>
          모집중
          <HeadCount>: 1 / 3명</HeadCount>
        </HeadCountBox>
      </PartyStatusBox>

      <PostInfo>
        <ProfileBox>
          <ProfileImage
            src={defaultImg}
          ></ProfileImage>
          <NickName>닉네임</NickName>
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

export default BlurCard;

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
  filter: blur(5px);
  -webkit-filter: blur(5px);
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
    color: #531cab;
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
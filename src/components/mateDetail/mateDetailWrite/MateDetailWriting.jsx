import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../../../common/firebase';
import { useParams } from 'react-router-dom';
import {
  GroupWrap,
  GroupHeader,
  GroupUserInfo,
  GroupImg,
  GroupUserId,
  GroupBox,
  GroupPerson,
  UserHr,
  Social,
  UserInfoWrap,
  DropdownOptions,
} from './MateDetailWritingstyle';
import parse from 'html-react-parser';
import defaultImg from '../../../assets/icon/user.png';
import SocialShare from './SocialShare';
import useUserQuery from '../../../hooks/useUserQuery';

// getDoc 사용 doc
const MateDetailWriting = () => {
  const { id } = useParams();
  const [post, setpost] = useState([]);
  const [parsedHtml, setparsedHtml] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const userDoc = useUserQuery();

  //useEffect에선 async사용할 수 없음
  const getPost = async () => {
    const q = doc(db, 'post', id);
    const postData = await getDoc(q);
    //비동기
    setpost(postData.data());
    // partyDesc -> html 파싱
    const html = postData.data().partyDesc;
    const parsed = parse(html);
    setparsedHtml(parsed);
  };

  useEffect(() => {
    getPost();
  }, [id]);
  return (
    <>
      <GroupWrap>
        <GroupHeader>{post.partyPostTitile}</GroupHeader>
        <GroupUserInfo>
          <UserInfoWrap>
            <GroupImg
              src={
                userDoc?.profileImg === null ? defaultImg : userDoc?.profileImg
              }
              alt={userDoc?.profileImg}
            ></GroupImg>
            <GroupUserId>{userDoc?.nickname}</GroupUserId>
            <Social
              onClick={() => {
                setShowOptions(!showOptions);
              }}
            >
              <DropdownOptions />
            </Social>
            {showOptions === true ? (
              <SocialShare
                onClose={() => {
                  setShowOptions(!showOptions);
                }}
              />
            ) : null}
          </UserInfoWrap>
        </GroupUserInfo>
        {/* <UserHr /> */}
        <GroupBox>
          <GroupPerson>{parsedHtml}</GroupPerson>
        </GroupBox>
      </GroupWrap>
    </>
  );
};

export default MateDetailWriting;

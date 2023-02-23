import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { authService, db } from '../../../common/firebase';
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
} from './MateDetailWritingstyle';
import parse from 'html-react-parser';
// import default_profile from '../../../assets/default_profile.png';
import { BsBookmarkHeart } from 'react-icons/bs';
import { onAuthStateChanged } from 'firebase/auth';

// getDoc 사용 doc
const MateDetailWriting = ({ item, db }) => {
  const { id } = useParams();
  const [post, setpost] = useState([]);
  const [uid, setUid] = useState('');
  const [parsedHtml, setparsedHtml] = useState('');
  const bookmark = item.bookmark;

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
  }, []);

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
    <>
      <GroupWrap>
        <GroupHeader>{post.partyPostTitile}</GroupHeader>
        <GroupUserInfo>
          <GroupImg
          // src={!item.profileImg ? default_profile : item.profileImg}
          >
            {/* 파이어베이스 post에 정보값이 없음 */}
            {/* {post.profileImg} */}
          </GroupImg>
          <GroupUserId>{post.nickName}</GroupUserId>
        </GroupUserInfo>
        <Bookmark>
          <span>{item.bookmark}</span>
          <BsBookmarkHeart
            onClick={handleBookmark}
            cursor="pointer"
            size="20px"
          />
        </Bookmark>
        <UserHr />
        <GroupBox>
          <GroupPerson>{parsedHtml}</GroupPerson>
        </GroupBox>
      </GroupWrap>
    </>
  );
};

export default MateDetailWriting;

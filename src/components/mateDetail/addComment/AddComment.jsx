import React, { useEffect, useState } from 'react';
import {
  AddCommentListWrap,
  AddCommentListAll,
  AddInputContent,
  AddCommentBtn,
  AddInputDiv,
  AddCommentBtnDiv,
} from './style';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { authService, db } from '../../../common/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { confirmAlert } from 'react-confirm-alert';
import AlertUI from './AlertUi';
import { uuidv4 } from '@firebase/util';
import { useRecoilValue } from 'recoil';
import commentState from './../../../recoil/commentState';

const AddComment = ({ id }) => {
  const [commentText, setCommentText] = useState('');
  //const [commentText, setCommentText] = useRecoilValue(commentState);

  console.log(commentState);

  // 파베 인증
  const currentUser = authService.currentUser;

  // 유저 닉네임 - 프로필 가져오기 상태
  const [nickName, setNickName] = useState('');
  const [profileImg, setGetProfileImg] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserUid, setCurrentUserUid] = useState('');

  const AddCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setCurrentUserName(authService.currentUser?.displayName);
        setCurrentUserUid(authService.currentUser?.uid);
      } else if (!user) {
        console.log('로그인을 해주세요');
      }
    });
  }, [currentUserName, currentUserUid]);

  // 데이터 올리기
  const NewDate = new Date().toLocaleDateString('kr');

  // 유저 닉네임 - 프로필 가져오기 함수
  const getUserInfo = async () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', currentUser.uid),
      // 댓글 내림차순
      orderBy('createdAt', 'desc'),
    );
    await getDocs(q).then((querySnapshot) => {
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push({
          nickName: doc.data().nickname,
          profileImg: doc.data().profileImg,
        });
      });
      setNickName(user.nickName);
      setGetProfileImg(user.profileImg);
    });
  };

  // 모집

  useEffect(() => {
    if (!currentUser) return;
    getUserInfo();
  }, [currentUser]);

  const AddCommentButton = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('로그인을 해주세요');
      return;
    }
    const newComment = {
      comment: commentText,
      userName: currentUser.displayName,
      userId: currentUserUid,
      createdAt: new Date(),
      date: NewDate,
      commentId: uuidv4(),
      //comment adddoc할때 mateDetailId값에 id(userid = :id)가져오기
      mateDetailId: id,
      postId: id,
      userImg: currentUser.photoURL,
      //updatedoc사용할것 - 배열사용(등록, 수정, 삭제 모두 배열로)
      //todolist 참고
      replyComment: [],
    };

    // console.log(newComment);
    if (!authService.currentUser) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return <AlertUI title={'로그인을 해주세요.'} onClose={onClose} />;
        },
      });
      setCommentText('');
    } else if (commentText !== '') {
      await addDoc(collection(db, 'comment'), newComment);
      setCommentText('');
    } else if (commentText === '') {
      confirmAlert({
        customUI: ({ onClose }) => {
          return <AlertUI title={'댓글을 입력해주세요.'} onClose={onClose} />;
        },
      });
    }
  };

  return (
    <>
      <AddCommentListAll>
        <AddCommentListWrap>
          <AddInputDiv>
            <AddInputContent
              onChange={AddCommentTextChange}
              value={commentText}
              placeholder={'댓글을 남겨주세요.'}
            />
          </AddInputDiv>
        </AddCommentListWrap>
        <AddCommentBtnDiv>
          <AddCommentBtn onClick={AddCommentButton}>등록하기</AddCommentBtn>
        </AddCommentBtnDiv>
      </AddCommentListAll>
    </>
  );
};

export default AddComment;

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authService } from './common/firebase';
import GlobalStyle from './components/GlobalStyle';
import authState from './recoil/authState';
import commentState from './recoil/commentState';
import Router from './shared/router';
import useComment from './hooks/useComment';

function App() {
  const setAuthState = useSetRecoilState(authState);
  const setCommentState = useSetRecoilState(commentState);
  const comment = useComment();

  console.log(comment);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setAuthState({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        setCommentState(comment.data);
      } else {
        return;
      }
    });
  }, [authService.currentUser]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

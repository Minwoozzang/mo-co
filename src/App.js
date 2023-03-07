import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authService } from './common/firebase';
import GlobalStyle from './components/GlobalStyle';
<<<<<<< HEAD
import authState from './recoil/authState';
import commentState from './recoil/commentState';
import Router from './shared/router';
import useComment from './hooks/useComment';

function App() {
  const setAuthState = useSetRecoilState(authState);
  const setCommentState = useSetRecoilState(commentState);
  const comment = useComment();

  console.log(comment);
=======
import useTeamPage from './hooks/useTeamPage';
import authState from './recoil/authState';
import Router from './shared/router';
import teamPageState from './recoil/teamPageState';

function App() {
  const setAuthState = useSetRecoilState(authState);

  const setTeamPageState = useSetRecoilState(teamPageState);
  const teamPage = useTeamPage();
>>>>>>> b6b3c516401226199be752194a774f0cbdfe2b6b

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
<<<<<<< HEAD
  }, [authService.currentUser]);
=======

    setTeamPageState(teamPage.data);
  }, [authService.currentUser, teamPage]);
>>>>>>> b6b3c516401226199be752194a774f0cbdfe2b6b

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

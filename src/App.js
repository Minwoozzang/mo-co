import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authService } from './common/firebase';
import GlobalStyle from './components/GlobalStyle';
import useTeamPage from './hooks/useTeamPage';
import authState from './recoil/authState';
import Router from './shared/router';
import teamPageState from './recoil/teamPageState';

function App() {
  const setAuthState = useSetRecoilState(authState);

  const setTeamPageState = useSetRecoilState(teamPageState);
  const teamPage = useTeamPage();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setAuthState({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        return;
      }
    });

    setTeamPageState(teamPage.data);
  }, [authService.currentUser, teamPage]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

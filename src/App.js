import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import userState from './recoil/userState';
import useUser from './hooks/useUser';
import { authService } from './common/firebase';
import GlobalStyle from './components/GlobalStyle';
import useTeamPage from './hooks/useTeamPage';
import authState from './recoil/authState';
import Router from './shared/router';
import teamPageState from './recoil/teamPageState';
import postState from './recoil/postState';
import usePosts from './hooks/usePost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const setAuthState = useSetRecoilState(authState);
  const setPostState = useSetRecoilState(postState);
  const setTeamPageState = useSetRecoilState(teamPageState);
  const setUserState = useSetRecoilState(userState);
  const post = usePosts();
  const teamPage = useTeamPage();
  const user = useUser();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setAuthState({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isLogin: true,
        });
      } else {
        return;
      }
    });
    setUserState(user.data);
    setPostState(post.data);
    setTeamPageState(teamPage.data);
  }, [post.data, teamPage.data, user.data]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;

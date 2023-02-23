import { GuideContainer, GuideText } from '../homestyle/homebanner';

const HomeGuideText = ({ currentUser, isLoggedIn }) => {
  console.log(currentUser?.displayName);
  return (
    <GuideContainer>
      {isLoggedIn ? (
        <GuideText>
          {currentUser?.displayName}님을 위한 추천 모각코 모임
        </GuideText>
      ) : (
        <>로그인 해주세요</>
      )}
    </GuideContainer>
  );
};

export default HomeGuideText;

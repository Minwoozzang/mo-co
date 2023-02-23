import { GuideContainer, GuideText } from '../homestyle/homebanner';

const HomeGuideText = ({ currentUser, isLoggedIn }) => {
  console.log(currentUser?.displayName);
  return (
    <GuideContainer>
      {isLoggedIn ? (
        <GuideText>
          {currentUser?.displayName}님과 딱 맞는 모각코 모임을 알려드릴게요
        </GuideText>
      ) : (
        <>로그인 해주세요</>
      )}
    </GuideContainer>
  );
};

export default HomeGuideText;

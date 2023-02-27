import { GuideContainer, GuideText } from '../homestyle/homebanner';

const HomeGuideText = ({ currentUser, isLoggedIn }) => {
  console.log(currentUser?.displayName);
  return (
    <GuideContainer>
      <GuideText>
        {isLoggedIn
          ? `${currentUser?.displayName}님을 위한 추천 모각코 모임`
          : '로그인하시면 모임 추천을 해드려요!'}
      </GuideText>
    </GuideContainer>
  );
};

export default HomeGuideText;

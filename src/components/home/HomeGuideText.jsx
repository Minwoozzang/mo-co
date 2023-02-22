import { GuideContainer, GuideText } from "../homestyle/homebanner";

const HomeGuideText = ({ currentUser }) => {
    console.log(currentUser?.displayName)
    return (
        <GuideContainer>
            <GuideText>
                {currentUser?.displayName}님과 딱 맞는 모각코 모임을 알려드릴게요
            </GuideText>
        </GuideContainer>
    );
};

export default HomeGuideText;
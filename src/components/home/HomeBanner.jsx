import {
  BannerContainer, BannerImg, BannerText1, BannerText2, BannerTextBox,
} from '../homestyle/homebanner';
import homebanner from '../../assets/homebanner.png';

const HomeBanner = () => {
  return (
    <BannerContainer>
      <BannerImg src={homebanner} />
      <BannerTextBox>
        <BannerText1>
          모각코 커뮤니티 MOCO에서 딱- 맞는 모각코를 찾아보세요!
        </BannerText1>
        <BannerText2>
          모각코를 위한 맞춤 모임 추천 및 매칭부터 모임 활동까지!
        </BannerText2>
      </BannerTextBox>
    </BannerContainer>
  );
};

export default HomeBanner;

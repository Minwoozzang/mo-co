import styled from '@emotion/styled';

/* HomeBanner */
const BannerContainer = styled.div`
  width: 100%;
  position: relative;
`;
const BannerImg = styled.img`
  background-color: #111111;
  height: 420px;
  width: 100%;
`;
const BannerTextBox = styled.div`
  width: 430px;
  height: 144px;
  position: absolute;
  top: 72px;
  left: 370px;
  /* background-color: lightgrey; */
`;
const BannerText1 = styled.div`
  width: 420px;
  height: 96px;
  font-size: 30px;
  font-weight: 600;
  color: #FFFFFF;
  display: flex;
  align-items: center;
`;
const BannerText2 = styled.div`
  width: 430px;
  height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  margin-top: 24px;
`
/* HomeGuideText */
const GuideContainer = styled.div`
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 50px; */
  /* background-color: #111111; */
`;
const GuideText = styled.div`
  /* width: 314px; */
  height: 44px;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-align: center;
`;

export {
  BannerContainer,
  BannerImg,
  BannerTextBox,
  BannerText1,
  BannerText2,
  GuideContainer,
  GuideText,
};

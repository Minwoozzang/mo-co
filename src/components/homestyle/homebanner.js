import styled from '@emotion/styled';

/* HomeBanner */
const BannerImg = styled.img`
  background-color: #111111;
  height: 420px;
  width: 100%;
  /* max-width: 100%; */
`;

/* HomeGuideText */
const GuideContainer = styled.div`
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
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
  BannerImg,
  GuideContainer,
  GuideText,
};

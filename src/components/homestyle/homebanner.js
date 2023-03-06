import styled from '@emotion/styled';
import Slider from 'react-slick';

/* HomeBanner */
const BannerContainer = styled.img`
  background-color: #111111;
  height: 318px;
  /* width: 100%; */
`;
const SliderArea = styled.div`
  width: 1120px;
  height: 209px;
  margin: 0 auto;
  /* display: flex;
    gap: 0 160px; */
  background-color: aliceblue;
`;
const BannerImg = styled.div`
  width: 530px;
  height: 209px;
  background-color: beige;
`;
const StyledSlider = styled(Slider)`
  height: 209px;
  width: 430px;
  /* position: relative; */
  /* .slick-prev::before,
    .slick-next::before {
        opacity: 0;
        display: none;
    } */
  /* display: flex;
    justify-content: center;
    align-items: center; */
`;
// const Pre = styled.div`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   left: 3%;
//   z-index: 3;
// `;
// const NextTo = styled.div`
//   width: 30px;
//   height: 30px;
//   position: absolute;
//   right: 3%;
//   z-index: 3;
// `;
const Banner = styled.div`
  width: 430px;
  height: 209px;
  /* background-color: lightgrey; */
  text-align: center;
  font-size: 50px;
  flex-wrap: wrap;
`;
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
  width: 314px;
  height: 44px;
  font-size: 21px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-align: center;
`;

export {
  BannerContainer,
  SliderArea,
  StyledSlider,
  Banner,
  GuideContainer,
  GuideText,
  BannerImg,
};

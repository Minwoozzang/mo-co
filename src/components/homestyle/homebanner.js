import styled from "@emotion/styled";
import Slider from "react-slick";

/* HomeBanner */
const BannerContainer = styled.img`
    background-color: #D9D9D9;
    height: 318px;
    width: 100%;
`
const SliderArea = styled.div`
    width: 1120px;
    height: 209px;
    margin: 0 auto;
    /* display: flex;
    gap: 0 160px; */
    background-color: aliceblue;
`
const BannerImg = styled.div`
    width: 530px;
    height: 209px;
    background-color: beige;
`
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
`
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
`
/* HomeGuideText */
const GuideContainer = styled.div`
    height: 144px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 65px;
    background-color: aliceblue;
`
const GuideText = styled.div`
    width: 314px;
    height: 44px;
    font-size: 21px;
    font-weight: 600;
    text-align: center;
`

export { BannerContainer, SliderArea, StyledSlider, Banner, GuideContainer, GuideText, BannerImg };
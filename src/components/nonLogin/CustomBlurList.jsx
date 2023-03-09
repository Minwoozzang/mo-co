import styled from '@emotion/styled';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import BlurCard from './blurcard/BlurCard';

const CustomBlurList = () => {
  const customBlurList1 = [1, 2, 3];
  const customBlurList2 = [1, 2];
  const customBlurList3 = [1];
  const navigate = useNavigate();
  const isSmallScreen1 = useMediaQuery({
    query: `(min-width: 1230px)`,
  });
  const isSmallScreen2 = useMediaQuery({
    query: `(min-width: 820px) and (max-width: 1230px)`,
  });
  const isSmallScreen3 = useMediaQuery({
    query: `(max-width: 820px)`,
  });
  return (
    <CustomListContainer>
      <CustomListCardBox>
        <GuideText onClick={() => navigate('/login')}>
          로그인이 필요합니다
        </GuideText>
        {isSmallScreen1 && customBlurList1.map((item, idx) => (
          <BlurCard key={idx} item={item} />
        ))}
        {isSmallScreen2 && customBlurList2.map((item, idx) => (
          <BlurCard key={idx} item={item} />
        ))}
        {isSmallScreen3 && customBlurList3.map((item, idx) => (
          <BlurCard key={idx} item={item} />
        ))}
        
      </CustomListCardBox>
    </CustomListContainer>
  );
};

export default CustomBlurList;

const CustomListContainer = styled.div`
  /* width: 1004px; */
  /* width: 52.3%; */
  width: 100%;
  height: 320px;
  margin: 50px auto 171px;
  /* border: 0.3px solid gray; */
`;
const CustomListCardBox = styled.div`
  /* width: 900px; */
  /* width: 89.65%; */
  width: 80%;
  height: 320px;
  margin: 0 auto;
  /* margin-top: -91px; */
  display: flex;
  gap: 0 30px;
  position: relative;
  /* background-color: pink; */
`;
const GuideText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 400;
  position: absolute;
  z-index: 9999;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #feff80;
  box-shadow: 0 0 10px 0 rgba(66, 66, 66, 0.5);
  padding: 10px;
  width: 200px;
  /* width: 25%; */
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import BlurCard from './blurcard/BlurCard';

const CustomBlurList = () => {
  const customBlurList = [1, 2, 3];
  const navigate = useNavigate();
  return (
    <CustomListContainer>
       <GuideText onClick={() => navigate('/login')}>
        로그인이 필요합니다
      </GuideText>
      <CustomListCardBox>
        {customBlurList.map((item, idx) => (
          <BlurCard key={idx} item={item} />
        ))}
      </CustomListCardBox>
      
    </CustomListContainer>
  );
};

export default CustomBlurList;

const CustomListContainer = styled.div`
  width: 1004px;
  height: 320px;
  margin: 50px auto 171px;
  /* border: 0.3px solid gray; */
`;
const CustomListCardBox = styled.div`
  width: 900px;
  height: 320px;
  margin: 0 auto;
  margin-top: -91px;
  display: flex;
  gap: 0 30px;
  /* background-color: aliceblue; */
`;
const GuideText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  z-index: 9999;
  top: 20%;
  left: 39%;
  background-color: #feff80;
  box-shadow: 0 0 10px 0 rgba(66, 66, 66, 0.5);
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

import styled from '@emotion/styled';
import CardSection from '../../../shared/CardSection';
import CustomBlurList from '../../nonLogin/CustomBlurList';

const CustomMeeting = ({ isLoggedIn, customList, uid, userBookmark }) => {
  return (
    <CustomListContainer>
      <CustomListCardBox>
        {isLoggedIn ? (
          customList.length === 0 ? (
            <NonCustomList>맞춤 정보에 해당하는 모임이 없습니다.</NonCustomList>
          ) : (
            customList
              .slice(0, 3)
              .map((item, idx) => (
                <CardSection
                  key={idx}
                  item={item}
                  uid={uid}
                  userBookmark={userBookmark}
                />
              ))
          )
        ) : (
          <CustomBlurList />
        )}
      </CustomListCardBox>
    </CustomListContainer>
  );
};

export default CustomMeeting;

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
  margin-top: 140px;
  display: flex;
  gap: 0 30px;
`;
// customList.length === 0
const NonCustomList = styled.div`
  width: 900px;
  height: 265px;
  margin: 0 auto;
  /* margin-top: 140px; */
  display: flex;
  background-color: #232323;
  border: 1px solid #3b3b3b;
  color: #ffffff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  box-shadow: 2px 4px 8px #545454;
`;

import styled from '@emotion/styled';
import { useState } from 'react';

import { Pagination } from 'antd';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { db } from '../../common/firebase';
import usePosts from '../../hooks/usePost';
import authState from '../../recoil/authState';
import CardSection from '../../shared/CardSection';
import FilterLocation from '../../shared/FilterLocation';
import FilterNumOfMember from '../../shared/FilterNumOfMember';
import FilterTech from '../../shared/FilterTech';
import FilterTime from '../../shared/FilterTime';
import headerToggle from '../../recoil/headerToggleState';

const MateList = () => {
  const user = useRecoilValue(authState);
  const { data, isLoading, isError, error } = usePosts();
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedNumOfMember, setSelectedNumOfMember] = useState('');
  // 정렬 옵션 상태
  const [selectedSort, setSelectedSort] = useState('');
  const [userBookmark, setUserBookmark] = useState([]);
  console.log(
    '🚀 ~ file: MateList.jsx:26 ~ MateList ~ userBookmark:',
    userBookmark,
  );
  //페이지네이션
  // const [currentPage, setCurrentPage] = useState(2);
  // 페이지네이션
  // 16개로 변경하면 값도 같이 변경 해야함 3 > 16
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(12);

  // 내 정보 가져오기
  const getUserBookmark = () => {
    const q = query(collection(db, 'user'), where('uid', '==', user?.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newInfo = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserBookmark(newInfo[0]?.bookmarks);
    });

    return unsubscribe;
  };

  // selectedTech 배열을 텍스트로 변환
  const selectedTechText = [...selectedTech]
    .map((item) => item.value)
    .join(',');

  // 페이지네이션 핸들러
  const handleChange = (page) => {
    setMinValue(page * 12 - 12);
    setMaxValue(page * 12);
  };

  // 필터 옵션 선택 핸들러
  const handleSelectTech = (tech) => {
    setSelectedTech(tech);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  const handleSelectNumOfMember = (numOfMember) => {
    setSelectedNumOfMember(numOfMember);
  };

  let DATA = data?.filter((item) => item.isDeleted === false);

  // 기술을 여러 개 선택했을 때는 필터가 작동을 안 함
  if (selectedTech.length > 0) {
    DATA = DATA.filter((item) => item.partyStack.includes(selectedTechText));
  }

  if (selectedLocation) {
    DATA = DATA.filter((item) => item.partyLocation === selectedLocation.value);
  }

  if (selectedTime) {
    DATA = DATA.filter((item) => item.partyTime === selectedTime.value);
  }

  if (selectedNumOfMember) {
    DATA = DATA.filter((item) => item.partyNum === selectedNumOfMember.value);
  }

  if (selectedSort === 'byRecommend') {
    DATA = DATA.sort((a, b) => b.bookmark - a.bookmark);
  }

  if (selectedSort === 'byNewest') {
    DATA = DATA.sort((a, b) => b.createdAt - a.createdAt);
  }

  const [dropDownClick, setDropDownClick] = useRecoilState(headerToggle);

  return (
    <FullScreen onClick={() => setDropDownClick(false)}>
      {/* 필터 & 정렬 */}
      <ViewOptions>
        <FilterBox>
          <FilterTech onSelectedTech={handleSelectTech} />
          <FilterLocation onSelectedLoaction={handleSelectLocation} />
          <FilterTime onSelectedTime={handleSelectTime} />
          <FilterNumOfMember onSelectedPeople={handleSelectNumOfMember} />
        </FilterBox>
        <SortBox>
          <SortByRecommend
            onClick={() => {
              setSelectedSort('byRecommend');
            }}
          >
            스크랩순
          </SortByRecommend>
          <SortByNew
            onClick={() => {
              setSelectedSort('byNewest');
            }}
          >
            최신순
          </SortByNew>
        </SortBox>
      </ViewOptions>

      {/* 카드 리스트 */}
      <CardListContainer>
        <CardList>
          {DATA &&
            DATA.length > 0 &&
            DATA.slice(minValue, maxValue).map((item) => (
              <CardSection
                key={item.id}
                item={item}
                db={db}
                userBookmark={userBookmark}
              />
            ))}
        </CardList>
      </CardListContainer>

      {/* 페이지 */}
      <PaginationContainer>
        <Pagination
          style={{
            textAlign: 'center',
            backgroundColor: '#181616',
            margin: '0 auto',
          }}
          defaultCurrent={1}
          defaultPageSize={12}
          onChange={handleChange}
          total={DATA ? DATA.length : 0}
        />
      </PaginationContainer>
    </FullScreen>
  );
};

export default MateList;

const FullScreen = styled.body`
  background-color: #181616;
  height: 100%;
  min-height: 100vh;
  width: 100%;
`;

// 필터 & 정렬
const ViewOptions = styled.div`
  max-width: 1200px;
  padding: 1em;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterBox = styled.div`
  display: flex;
  gap: 1em;
`;

const SortBox = styled.div`
  display: flex;
  gap: 1em;
`;

const SortByRecommend = styled.div`
  cursor: pointer;
  color: white;
`;
const SortByNew = styled.div`
  cursor: pointer;
  color: white;
`;

// 카드 리스트
const CardListContainer = styled.section`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const CardList = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  row-gap: 5em;
`;

// 페이지네이션
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  /* margin: 3rem; */
  /* margin-top: 110px; */
  padding: 6rem;
  background-color: #181616;
`;

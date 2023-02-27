import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import CardSection from '../../shared/CardSection';
import FilterTech from '../../shared/FilterTech';
import FilterLocation from '../../shared/FilterLocation';
import FilterTime from '../../shared/FilterTime';
import FilterNumOfMember from '../../shared/FilterNumOfMember';
import { authService, db } from '../../common/firebase';
import { Pagination } from 'antd';
import usePosts from '../../hooks/usePost';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const MateList = () => {
  const { data, isLoading, isError, error } = usePosts();
  console.log('🚀 ~ file: MateList.jsx:17 ~ MateList ~ data:', data);

  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedNumOfMember, setSelectedNumOfMember] = useState('');
  // 정렬 옵션 상태
  const [selectedSort, setSelectedSort] = useState('');
  const [uid, setUid] = useState('');
  const [userBookmark, setUserBookmark] = useState([]);
  //페이지네이션
  // const [currentPage, setCurrentPage] = useState(2);
  // 페이지네이션
  // 16개로 변경하면 값도 같이 변경 해야함 3 > 16
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(12);

  // 내 정보 가져오기
  const getUserBookmark = () => {
    const q = query(
      collection(db, 'user'),
      where('uid', '==', authService.currentUser.uid),
    );
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

  let DATA = data;

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

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        getUserBookmark();
      } else {
        return;
      }
    });
  }, [uid]);

  return (
    <FullScreen>
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
            추천순
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
                uid={uid}
              />
            ))}
        </CardList>
      </CardListContainer>

      {/* 페이지 */}
      <PaginationContainer>
        <Pagination
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

const FullScreen = styled.div`
  background-color: #181616;
  /* height: 100v; */
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
  margin: 0 auto;
`;

const CardList = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  row-gap: 5em;
  > * {
    flex-grow: 1;
    flex-shrink: 1;
  }
`;

// 페이지네이션
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  /* margin: 3rem; */
  margin-top: 110px;
  color: white;
`;

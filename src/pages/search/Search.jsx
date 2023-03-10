import styled from '@emotion/styled';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { db } from '../../common/firebase';
import PaginationSearch from '../../components/pagenation/PaginationSearch';
import headerToggle from '../../recoil/headerToggleState';
import CardSection from '../../shared/CardSection';
// import SearchResultCard from './SearchResultCard';

const Search = () => {
  const params = useParams();
  const [searchData, setSearchData] = useState([]);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(6);

  // 페이지네이션 핸들러
  const handleChange = (page) => {
    setMinValue(page * 6 - 6);
    setMaxValue(page * 6);
  };

  // firestore에서 post 문서 받아와서 검색한 내용이 포함 된 데이터만 추출
  useEffect(() => {
    const postCollectionRef = collection(db, 'post');
    const q = query(postCollectionRef, orderBy('createdAt', 'desc'));
    const getPost = onSnapshot(q, (snapshot) => {
      const newPost = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const firstCharUpper = params.word.replace(/^[a-z]/, (char) =>
        char.toUpperCase(),
      );

      let filterList = [];
      newPost.map((item) => {
        let stringStack = '';
        if (item.partyStack.length > 0) {
          for (let i = 0; i < item.partyStack.length; i++) {
            stringStack += item.partyStack[i];
          }
        }
        if (
          stringStack.includes(firstCharUpper) ||
          item.partyLocation.includes(params.word) ||
          item.partyTime.includes(params.word) ||
          item.partyName.includes(params.word)
        ) {
          filterList.push(item);
        }
      });
      setSearchData(filterList);
    });
    return getPost;
  }, [params.word]);
  // console.log(searchData);

  const [dropDownClick, setDropDownClick] = useRecoilState(headerToggle);

  return (
    <SearchResultFullScreen onClick={() => setDropDownClick(false)}>
      <SearchResultContainer>
        <SearchTitle>검색 건수 : {searchData.length}</SearchTitle>
        
          {searchData.length > 0 ? (
            <>
            <CardWrapper>
            {searchData.slice(minValue, maxValue).map((item, idx) => (
              <CardSection key={idx} item={item} db={db} />
            ))}
            </CardWrapper>
            <PaginationContainer>
            <PaginationSearch 
              data={searchData} 
              handleChange={handleChange}
            />
            </PaginationContainer>
            </>
          ) : (
            <CardWrapper>
              <NonSearchResultBox>
              <NonSearchResultText>검색 결과가 없습니다.</NonSearchResultText>
            </NonSearchResultBox>
              </CardWrapper>
          )}
        
      </SearchResultContainer>
    </SearchResultFullScreen>
  );
};

export default Search;

const SearchResultFullScreen = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  /* height: 100%; */
  background-color: #111111;
  /* margin-top: 80px; */
  /* background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center; */
`;
const SearchResultContainer = styled.div`
  /* width: 1180px; */
  width: 61.46%;
  /* height: 62.5rem; */
  /* height: 1500px; */
  margin: 0 auto;
  /* background-color: #111111; */
`;
const SearchTitle = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* background-color: #c8f1e8; */
  gap: 100px 20px;
  /* width: 100%; */
  width: 55rem;
  /* height: 1000px; */
`;
const NonSearchResultBox = styled.div`
  width: 80%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px auto 0;
  /* background-color: #3B3B3B; */
  border-radius: 20px;
`;
const NonSearchResultText = styled.div`
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
`;

// 페이지네이션
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 880px;
  /* margin: 3rem; */
  /* margin-top: 110px; */
  padding: 6rem;
  /* background-color: #111111; */
  /* background-color: bisque; */
`;

// <SearchResultCard key={idx} {...item} />

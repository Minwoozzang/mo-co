import styled from '@emotion/styled';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { db } from '../../common/firebase';
import headerToggle from '../../recoil/headerToggleState';
import CardSection from '../../shared/CardSection';
// import SearchResultCard from './SearchResultCard';

const Search = () => {
  const params = useParams();
  const [searchData, setSearchData] = useState([]);

  // firestore에서 post 문서 받아오기
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
  console.log(searchData);

  const [dropDownClick, setDropDownClick] = useRecoilState(headerToggle);

  return (
    <SearchResultFullScreen onClick={() => setDropDownClick(false)}>
      <SearchResultContainer>
        <SearchTitle>검색어 : {params.word.toLowerCase()}</SearchTitle>
        <CardWrapper>
          {searchData.map((item, idx) => (
            <CardSection key={idx} item={item} db={db} />
          ))}
        </CardWrapper>
      </SearchResultContainer>
    </SearchResultFullScreen>
  );
};

export default Search;

const SearchResultFullScreen = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #111111;
  /* background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center; */
`;
const SearchResultContainer = styled.div`
  width: 1180px;
  /* height: 1000px; */
  margin: 0 auto;
  /* background-color: #111111; */
`;
const SearchTitle = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* background-color: #c8f1e8; */
  gap: 100px 20px;
`;
// <SearchResultCard key={idx} {...item} />

import styled from '@emotion/styled';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../common/firebase';
import SearchResultCard from './SearchResultCard';

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
        };
        if (stringStack.includes(firstCharUpper) ||
        item.partyLocation.includes(params.word) ||
        item.partyTime.includes(params.word) ||
        item.partyName.includes(params.word)) {
          filterList.push(item);
        }
      });
      console.log(filterList);
      setSearchData(filterList);
    });
    return getPost;
  }, [params.word]);
  console.log(searchData);

  return (
    <SearchResultContainer>
      <SearchTitle>검색어 : {params.word.toLowerCase()}</SearchTitle>
      <CardWrapper>
        {searchData.map((searchdata) => (
          <SearchResultCard key={searchdata.id} {...searchdata} />
        ))}
      </CardWrapper>
    </SearchResultContainer>
  );
};

export default Search;

const SearchResultContainer = styled.div`
  width: 1180px;
  margin: 0 auto;
  /* background-color: aliceblue; */
`;
const SearchTitle = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* background-color: #c8f1e8; */
  gap: 20px 20px;
`;

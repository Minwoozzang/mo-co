import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../common/firebase';
import { Spin } from 'antd';

function Test() {
  const { isLoading, isError, data, error } = useQuery(
    'posts',
    async () => {
      const q = collection(db, 'post');
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return posts;
    },
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 2 * 60 * 1000,
      notifyOnChangeProps: ['data'], // 데이터가 바꾸지 않았을 때는 리렌더링 하지 않음
    },
  );

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log('🚀 ~ file: Test.jsx:24 ~ Test ~ data', data);

  return (
    <div>
      <h1>Posts:</h1>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.id}</h2>
          <p>{post.partyName}</p>
        </div>
      ))}
    </div>
  );
}

export default Test;

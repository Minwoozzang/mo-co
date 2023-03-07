import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { authService, db } from '../common/firebase';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

export default function useUser() {
  // const [user, setUser] = useState([]);
  // const userData = useCallback(() => {
  //   const q = query(collection(db, 'user'));
  //   const AllInfo = onSnapshot(q, (snapshot) => {
  //     const newInfo = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setUser(newInfo);
  //   });
  //   return AllInfo;
  // }, []);
  // return { user, userData };
  return useQuery(
    'users',
    async () => {
      const q = query(
        collection(db, 'user'),
        where('uid', '==', authService.currentUser.uid),
      );
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
    },
  );
}

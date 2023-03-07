import { collection, getDocs, query, where } from 'firebase/firestore';
import { authService, db } from '../common/firebase';
import { useQuery } from 'react-query';

const useUser = () => {
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
};

export default useUser;

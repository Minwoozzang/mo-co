import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../common/firebase';
import { getPost, getTeamPage } from '../common/utils/getApi';

export default function useTestTeam() {
  return useQuery(
    'teamPages',
    async () => {
      // const q = collection(db, 'post');
      const q = query(collection(db, 'teamPage'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const teamPages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return teamPages;
    },
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 2 * 60 * 1000,
    },
  );
};
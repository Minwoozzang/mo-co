import { useQuery } from 'react-query';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../common/firebase';

export default function useTeamPage() {
  return useQuery('teamPage', async () => {
    const q = query(collection(db, 'teamPage'));
    const querySnapshot = await getDocs(q);
    const teamPages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return teamPages;
  });
}

import { useQuery } from 'react-query';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../common/firebase';

export default function useUser() {
  return useQuery('user', async () => {
    const q = query(collection(db, 'user'));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  });
}

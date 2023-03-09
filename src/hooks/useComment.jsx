// import { useQuery } from 'react-query';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { authService, db } from '../common/firebase';

// export default function useComment() {
//   return useQuery(
//     'comment',
//     async () => {
//       const q = query(collection(db, 'comment'), orderBy('createdAt', 'desc'));
//       const querySnapshot = await getDocs(q);
//       const comment = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       return comment;
//     },

//     {
//       cacheTime: 5 * 60 * 1000,
//       staleTime: 2 * 60 * 1000,
//     },
//   );
// }

import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useRecoilValue } from 'recoil';
import { db } from '../common/firebase';
import authState from '../recoil/authState';

export default function useUserDoc() {
  const user = useRecoilValue(authState);
  const docRef = doc(db, 'user', `${user?.uid}`);
  const [value] = useDocument(docRef);
  const userDoc = value?.data();
  return userDoc;
}

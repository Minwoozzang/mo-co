import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const getPost = async () => {
  const q = query(
    collection(db, 'post'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
};

export const getTeamPage = async () => {
  const q = query(
    collection(db, 'teamPage'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const teamPages = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return teamPages;
};
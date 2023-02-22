import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyBo23LJ8u_muKicP8zK7jYxZ0t35iA5pDo",
  authDomain: "mo-co-92f26.firebaseapp.com",
  databaseURL: "https://mo-co-92f26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mo-co-92f26",
  storageBucket: "mo-co-92f26.appspot.com",
  messagingSenderId: "839524563156",
  appId: "1:839524563156:web:e4e5be6d6302cc699ba341"
};

export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

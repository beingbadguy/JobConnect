import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArgI4LFFTBBShy7iYai_Bm90bo2aZVp88",
  authDomain: "book-store-7197e.firebaseapp.com",
  projectId: "book-store-7197e",
  storageBucket: "book-store-7197e.appspot.com",
  messagingSenderId: "971886919631",
  appId: "1:971886919631:web:ca877c8f9405899737dcba",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };

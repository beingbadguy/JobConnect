import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const FirebaseContext = createContext(null);

const MainContext = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    const jobsRef = collection(db, "jobs");
    const snapshot = await getDocs(jobsRef);

    const jobs = snapshot.docs.map((doc) => ({
      id: doc.id, // Get the document ID (jobId)
      ...doc.data(), // Spread the rest of the document data
    }));

    setJobs(jobs);
    // console.log(jobs);
  };
  const [userData, setUserData] = useState();

  const fetchUser = async (id) => {
    const userRef = doc(db, "users", id);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      setUserData(userData);
      // console.table("User data:", userData);
    } else {
      console.log("no such user exists");
    }
  };
  // console.log(userData);

  useEffect(() => {
    fetchJobs();
  }, []);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUser(currentUser.uid);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });

    return () => unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      console.log("User signed out");
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveJobs = async (JobId) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        JobsSaved: arrayUnion(JobId),
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{ jobs, user, logout, setUser, userData, saveJobs }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
export default MainContext;

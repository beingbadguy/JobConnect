import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
    console.log(jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <FirebaseContext.Provider value={{ jobs, user }}>
      {children}
    </FirebaseContext.Provider>
  );
};
export default MainContext;

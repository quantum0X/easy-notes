import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const authContext = createContext();

const useAuth = () => useContext(authContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  console.log(currentUser);
  const [loading, setLoading] = useState(true);

  const signUpHandle = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInHandle = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutHandle = () => signOut(auth);

  const value = {
    currentUser,
    signUpHandle,
    signInHandle,
    signOutHandle,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  );
};

export { useAuth, AuthProvider };

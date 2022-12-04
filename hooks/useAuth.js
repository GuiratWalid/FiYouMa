import React, { createContext, useContext, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import config from "../config/google";
import initfirebase from "../config/firebase";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

const auth = getAuth(initfirebase);
const firestore = getFirestore(initfirebase);

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const signInWithGoogle = async (response) => {
    console.log(response);
    if (response?.type === "success") {
      const { idToken, accessToken } = response.authentication;
      console.log(accessToken);
      const credential = await GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      return await signInWithCredential(auth, credential);
    }
    return Promise.reject();
  };

  const login = async (email, password) => {
    if (email.length === 0 || !email.includes("@"))
      alert("Email should have this form: abc@abc.com !");
    else if (password.length < 6)
      alert("The password should contain at least 6 characters !");
    else {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (response) => {
          const docRef = doc(firestore, "users", response.user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data());
            navigation.navigate("Home");
          } else {
            alert("Profile is incomplete ! Please complete your profile!");
            setUser(response.user);
            navigation.navigate("Profile");
          }
        })
        .catch((erreur) => {
          alert(erreur);
        });
    }
  };

  const register = async (email, password, confirmPassword) => {
    if (email.length === 0 || !email.includes("@"))
      alert("Email should have this form: abc@abc.com !");
    else if (
      password.length === 0 ||
      password !== confirmPassword ||
      password.length < 6
    )
      alert("Please confirm the password !");
    else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          setUser(response.user);
          navigation.navigate("Profile");
        })
        .catch((erreur) => {
          alert(erreur);
        });
    }
  };

  const createProfile = async (displayName, photoURL, job, age) => {
    const updatedUser = {
      uid: user.uid,
      email: user.uid,
      displayName,
      photoURL,
      job,
      age,
    };
    setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email: user.uid,
      displayName,
      photoURL,
      job,
      age,
    })
      .then(() => {
        setUser(updatedUser);
        navigation.navigate("Home");
      })
      .catch((error) => {
        setUser(null);
        navigation.navigate("Login");
        alert(error);
      });
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
        navigation.navigate("Login");
      })
      .catch((erreur) => {
        alert(erreur);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signInWithGoogle,
        logout,
        login,
        register,
        createProfile,
        loading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

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
  getDocs,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { useGenerateId } from "./useGenerateId";

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

  const updatePhoto = async (photoURL) => {
    if (!photoURL) alert("Please upload photo or enter a photo URL");
    else {
      const updatedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.job,
        photoURL,
        job: user.job,
        age: user.age,
      };
      setDoc(doc(firestore, "users", user.uid), updatedUser)
        .then(() => {
          setUser(updatedUser);
          navigation.navigate("Home");
        })
        .catch((error) => {
          setUser(null);
          navigation.navigate("Login");
          alert(error);
        });
    }
  };

  const createProfile = async (displayName, job, age) => {
    if (!displayName) alert("Full name is required !");
    else if (!job) alert("Occupation is required !");
    else if (!age) alert("Age is required !");
    else {
      const updatedUser = {
        uid: user.uid,
        email: user.email,
        displayName,
        job,
        age,
      };
      setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email: user.uid,
        displayName,
        job,
        age,
      })
        .then(() => {
          setUser(updatedUser);
          navigation.navigate("Picture");
        })
        .catch((error) => {
          setUser(null);
          navigation.navigate("Login");
          alert(error);
        });
    }
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

  const getAllUsers = async () => {
    const q = query(
      collection(firestore, "users"),
      where("uid", "!=", user.uid)
    );
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      doc.data() && array.push(doc.data());
    });
    return array;
  };

  const matchUsers = async (loggedInProfile, userSwipped) => {
    const id = useGenerateId(loggedInProfile.uid, userSwipped.uid);
    await setDoc(doc(firestore, "matches", id), {
      users: {
        [loggedInProfile.uid]: loggedInProfile,
        [userSwipped.uid]: userSwipped,
      },
      usersMatched: [user.uid, userSwipped.uid],
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signInWithGoogle,
        getAllUsers,
        logout,
        login,
        register,
        createProfile,
        matchUsers,
        updatePhoto,
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

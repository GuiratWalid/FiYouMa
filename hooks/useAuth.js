import React, { createContext, useContext } from "react";
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
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

// const auth = getAuth(initfirebase);

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();
export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const signInWithGoogle = async () => {
    const [request, response, promptAsync] = Google.useAuthRequest(config);
    promptAsync();
    console.log(response);
    if (response?.type === "success") {
      const { idToken, accessToken } = response.authentication;
      console.log(accessToken);
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(getAuth(), credential);
    }
    return Promise.reject();
  };

  const login = async (email, password) => {
    if (email.length === 0 || !email.includes("@"))
      return "Email should have this form: abc@abc.com !";
    else if (password.length < 6)
      return "The password should contain at least 6 characters !";
    else {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.replace("Home");
        })
        .catch((erreur) => {
          return erreur;
        });
    }
    return null;
  };

  const register = async (email, password, confirmPassword) => {
    email = "walid@test.com";
    password = confirmPassword = "123456";
    if (email.length === 0 || !email.includes("@"))
      alert("Email should have this form: abc@abc.com !");
    else if (
      password.length === 0 ||
      password !== confirmPassword ||
      password.length < 6
    )
      alert("Please confirm the password !");
    else {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          console.log(response);
          alert("OK");
          navigation.replace("Home");
        })
        .catch((erreur) => {
          alert(erreur);
        });
      alert("k");
    }
    return "";
  };

  const logout = () => {
    alert("Logout");
  };

  return (
    <AuthContext.Provider
      value={{
        user: {
          displayName: "Walid",
          photoURL:
            "https://thumbs.dreamstime.com/b/ic%C3%B4ne-femme-avatar-clipart-femmes-dans-le-vecteur-png-fille-la-bande-bisness-233362315.jpg",
        },
        signInWithGoogle,
        logout,
        login,
        register,
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

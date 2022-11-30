// import { View, Text, Image } from "react-native";
// import React, { useEffect } from "react";
// import { useTailwind } from "tailwind-rn";
// import { SafeAreaView } from "react-native-safe-area-context";
// import * as WebBrowser from "expo-web-browser";
// import { ResponseType } from "expo-auth-session";
// import * as Google from "expo-auth-session/providers/google";
// // import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithCredential,
// } from "firebase/auth";

// // Initialize Firebase
// initializeApp({
//   /* Config */
// });

// WebBrowser.maybeCompleteAuthSession();

// function LoginScreen() {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: "Your-Web-Client-ID.apps.googleusercontent.com",
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       const { id_token } = response.params;
//       const auth = getAuth();
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential);
//     }
//   }, [response]);

//   return (
//     <Button
//       disabled={!request}
//       title="Login"
//       onPress={() => {
//         promptAsync();
//       }}
//     />
//   );
// }

// export default LoginScreen;

import { View, Text } from "react-native";
import React from "react";
import { NAME } from "@env";

const LoginScreen = () => {
  console.log(NAME);
  return (
    <View>
      <Text>Bonjour {NAME}</Text>
    </View>
  );
};

export default LoginScreen;

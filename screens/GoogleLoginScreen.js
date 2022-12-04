// import { useState, useEffect } from "react";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { Button, Image, Text, View } from "react-native";
// import config from "../config/google";

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {
//   const [user, setUser] = useState();
//   const [accessToken, setAccessToken] = useState();
//   const [request, response, promptAsync] = Google.useAuthRequest(config);
//   useEffect(() => {
//     if (response?.type === "success") {
//       const accessToken = response.authentication.accessToken;
//       setAccessToken(accessToken);
//     }
//   }, [response]);

//   const getUserData = async () => {
//     try {
//       let userInfoResponse = await fetch(
//         "https://www.googleapis.com/oauth2/v2/userinfo",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       const userResult = await userInfoResponse.json();
//       setUser(userResult);
//     } catch (error) {
//       console.log("GoogleUserReq error: ", error.response.data);
//       setReqError(error.response.data);
//     }
//   };

//   const showInfoUser = () => {
//     if (user) {
//       return (
//         <View>
//           <Image
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               width: 50,
//               height: 50,
//               marginTop: 30,
//             }}
//             source={{ uri: user.picture }}
//           />
//           <Text>Welcome {user.name}</Text>
//           <Text>{user.picture}</Text>
//           <Text>{user.email}</Text>
//         </View>
//       );
//     }
//   };

//   return (
//     <View>
//       <Button
//         title={accessToken ? "Get User Data" : "Login"}
//         onPress={
//           accessToken
//             ? getUserData
//             : () => {
//                 promptAsync();
//               }
//         }
//       />
//       <Button
//         title="Reset"
//         onPress={() => {
//           setUser();
//           setAccessToken();
//           promptAsync();
//         }}
//       />
//       {showInfoUser()}
//     </View>
//   );
// }
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import * as Google from "expo-auth-session/providers/google";
import config from "../config/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const GoogleLoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const navigation = useNavigation();
  const tailwind = useTailwind();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={tailwind("flex-1 ")}>
      <ImageBackground
        resizeMode="cover"
        style={tailwind("flex-1 items-center justify-center")}
        source={require("../assets/images/background1.png")}
      >
        <Image
          style={[tailwind("mb-40"), { height: 200, width: 200 }]}
          source={require("../assets/images/logo.png")}
        />
        <TouchableOpacity
          style={[
            tailwind("absolute bottom-64 w-52 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
          onPress={async () => {
            await promptAsync();
            await signInWithGoogle(response);
          }}
        >
          <Text style={tailwind("font-bold text-center")}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <View style={tailwind("absolute bottom-40 flex flex-row mt-4")}>
          <TouchableOpacity
            style={tailwind("p-4")}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={tailwind("font-semibold text-white text-center")}>
              Create new account ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind("p-4")}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={tailwind("font-semibold text-white text-center")}>
              Sign in with account ?
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default GoogleLoginScreen;

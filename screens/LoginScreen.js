import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button, Image, Text, View } from "react-native";
import config from "../config/google";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  useEffect(() => {
    if (response?.type === "success") {
      const accessToken = response.authentication.accessToken;
      setAccessToken(accessToken);
    }
  }, [response]);

  const getUserData = async () => {
    try {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userResult = await userInfoResponse.json();
      setUser(userResult);
    } catch (error) {
      console.log("GoogleUserReq error: ", error.response.data);
      setReqError(error.response.data);
    }
  };

  const showInfoUser = () => {
    if (user) {
      console.log(user.picture);
      return (
        <View>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/a/ALm5wu2oCNTmZYOA-lO1rEBIGP_3V48hqPJxo7Y8AFOZ=s96-c",
            }}
          />
          <Text>Welcome {user.name}</Text>
          <Text>{user.picture}</Text>
          <Text>{user.email}</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <Button
        title={accessToken ? "Get User Data" : "Login"}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync();
              }
        }
      />
      <Button
        title="Reset"
        onPress={() => {
          setUser();
          setAccessToken();
          promptAsync();
        }}
      />
      {showInfoUser()}
    </View>
  );
}

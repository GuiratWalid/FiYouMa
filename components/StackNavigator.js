import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import GoogleLoginScreen from "../screens/GoogleLoginScreen";
import useAuth from "../hooks/useAuth";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ModalScreen from "../screens/ModalScreen";
import MatchedScreen from "../screens/MatchedScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator defaultScreenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen}></Stack.Screen>
            <Stack.Screen
              name="Matched"
              component={MatchedScreen}
            ></Stack.Screen>
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen
              name="GoogleLogin"
              component={GoogleLoginScreen}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            ></Stack.Screen>
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;

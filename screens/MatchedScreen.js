import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const tailwind = useTailwind();
  const { matchUsers } = useAuth();
  const { loggedInProfile, userSwipped } = params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    matchUsers(loggedInProfile, userSwipped);
  }, []);

  return (
    <View style={[tailwind("flex-1"), { opacity: 0.7 }]}>
      <ImageBackground
        resizeMode="cover"
        style={tailwind("flex-1 pt-20")}
        source={require("../assets/images/background1.png")}
      >
        <View style={tailwind("justify-center px-6 pt-20")}>
          <Image
            style={tailwind("h-20 w-full")}
            source={require("../assets/images/match.png")}
          />
        </View>
        <Text style={tailwind("text-white text-center mt-10")}>
          You and {userSwipped.displayName} have liked each other.
        </Text>
        <View style={tailwind("flex-row justify-evenly mt-10")}>
          <Image
            style={tailwind("h-32 w-32 rounded-full")}
            source={{
              uri: loggedInProfile.photoURL,
            }}
          />
          <Image
            style={tailwind("h-32 w-32 rounded-full")}
            source={{
              uri: userSwipped.photoURL,
            }}
          />
        </View>
        <TouchableOpacity
          style={tailwind("bg-white m-10 px-10 py-8 rounded-full mt-20")}
          onPress={() => {
            navigation.goBack();
            navigation.navigate("Chat");
          }}
        >
          <Text style={tailwind("text-center font-bold text-lg")}>
            Send a Message
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default MatchedScreen;

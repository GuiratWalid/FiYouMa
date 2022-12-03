import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const HomeHeader = ({ photoURL }) => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const { logout } = useAuth();
  return (
    <View
      style={tailwind("flex-row items-center justify-between relative px-5")}
    >
      <TouchableOpacity onPress={logout}>
        <Image
          style={tailwind("h-10 w-10 rounded-full")}
          source={{ uri: photoURL }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Modal")}
        style={tailwind("mt-2")}
      >
        <Image
          style={tailwind("h-16 w-14")}
          source={require("../assets/images/logo1.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Ionicons name="chatbubble-sharp" size={35} color="#FF5864" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

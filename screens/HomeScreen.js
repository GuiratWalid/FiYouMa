import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const { user, logout } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });

  return (
    <SafeAreaView>
      {/*Header*/}
      <View
        style={tailwind("flex-row items-center justify-between relative px-5")}
      >
        <TouchableOpacity onPress={logout}>
          <Image
            style={tailwind("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={tailwind("mt-2")}>
          <Image
            style={tailwind("h-16 w-14")}
            source={require("../assets/images/logo1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubble-sharp" size={35} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* End of Header*/}
      <Text style={tailwind("")}>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";

const LoginScreen = () => {
  const [displayName, setDisplayName] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState();
  const { createProfile, loading } = useAuth();
  const navigation = useNavigation();
  const tailwind = useTailwind();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={tailwind("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tailwind("flex-1 items-center justify-center")}
        source={require("../assets/images/background1.png")}
      >
        <Image
          style={[tailwind("mb-8"), { height: 200, width: 200 }]}
          source={require("../assets/images/logo.png")}
        />
        <TextInput
          style={tailwind(
            "w-64 p-2 text-center bg-white h-12 mb-8 rounded-2xl"
          )}
          onChangeText={(e) => {
            setDisplayName(e);
          }}
          placeholder="Full Name"
          value={displayName}
        ></TextInput>
        <TextInput
          style={tailwind(
            "w-64 p-2 text-center bg-white h-12 mb-8 rounded-2xl"
          )}
          onChangeText={(e) => {
            setJob(e);
          }}
          placeholder="Occupation"
          value={job}
        ></TextInput>
        <TextInput
          style={tailwind(
            "w-64 p-2 text-center bg-white h-12 mb-10 rounded-2xl"
          )}
          onChangeText={(e) => {
            setAge(e);
          }}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          maxLength={2}
        ></TextInput>
        <TouchableOpacity
          style={[
            tailwind("w-52 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
          onPress={async () => await createProfile(displayName, job, age)}
        >
          <Text style={tailwind("font-bold text-center")}>Create Account</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

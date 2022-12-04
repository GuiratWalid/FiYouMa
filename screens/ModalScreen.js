import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const { user, createProfile } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Update your profile",
      headerStyle: {
        backgroundColor: "#FF5864",
      },
      headerTitleStyle: { color: "white", textAlign: "center" },
    });
  });

  return (
    <View style={tailwind("flex-1 bg-white items-center pt-3")}>
      <Image
        style={tailwind("h-20 w-full")}
        resizeMode="contain"
        source={require("../assets/images/modal.png")}
      />
      <Text style={tailwind("text-xl text-gray-500 pb-2 font-bold")}>
        Welcome {user.displayName}
      </Text>
      <Text style={tailwind("text-center p-3 font-bold text-red-400")}>
        Step 1: The Profile Picture
      </Text>
      <TextInput
        style={tailwind("h-12 text-center bg-white pb-2")}
        placeholder="Enter a Profile Picture URL"
        onChangeText={(text) => setImage(text)}
        value={image}
      ></TextInput>
      <Text style={tailwind("text-center p-3 font-bold text-red-400")}>
        Step 2: The Job
      </Text>
      <TextInput
        style={tailwind("text-center h-12 bg-white pb-2")}
        placeholder="Enter your occupation"
        onChangeText={(text) => setJob(text)}
        value={job}
      />
      <Text style={tailwind("text-center p-3 font-bold text-red-400")}>
        Step 3: The Age
      </Text>
      <TextInput
        style={tailwind("text-center h-12 bg-white pb-2")}
        placeholder="Enter your age"
        onChangeText={(text) => setAge(text)}
        value={age}
        keyboardType="numeric"
        maxLength={2}
      />
      <TouchableOpacity
        disabled={!image || !age || !job}
        style={tailwind(
          `w-64 p-3 rounded-xl absolute bottom-10 bg-red-400 ${
            !image || !age || !job ? "bg-gray-400" : "bg-red-400"
          }`
        )}
        onPress={async () =>
          await createProfile(user.displayName, image, job, age)
        }
      >
        <Text style={tailwind("text-center font-bold text-white text-xl")}>
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;

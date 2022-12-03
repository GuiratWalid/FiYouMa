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
import DialogComponent from "../components/DialogComponent";

const LoginScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [job, setJob] = useState("");
  const [age, setAge] = useState();
  const [visible, setVisible] = useState(false);
  const { login, loading } = useAuth();
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const setVisibility = (vis) => setVisible(vis);
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
          style={[tailwind("mb-8"), { height: 150, width: 150 }]}
          source={require("../assets/images/logo.png")}
        />
        <TextInput
          style={tailwind(
            "w-64 p-2 text-center bg-white h-12 mb-8 rounded-2xl"
          )}
          onChangeText={(e) => {
            setFirstName(e);
          }}
          placeholder="First Name"
          value={firstName}
        ></TextInput>
        <TextInput
          style={tailwind(
            "w-64 p-2 text-center bg-white h-12 mb-8 rounded-2xl"
          )}
          onChangeText={(e) => {
            setLastName(e);
          }}
          placeholder="Last Name"
          value={lastName}
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
          onPress={() => alert(firstName)}
        >
          <Text style={tailwind("font-bold text-center")}>Create Account</Text>
        </TouchableOpacity>
        {/* <DialogComponent
          visible={visible}
          title="Alert"
          message="Veuillez Saisir le mot de passe"
          setVisibility={setVisibility}
        /> */}
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

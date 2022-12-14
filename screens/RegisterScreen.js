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

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, loading } = useAuth();
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
            setEmail(e);
          }}
          placeholder="Email address"
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          style={tailwind(
            "w-64 p-2 text-center bg-white h-12 mb-8 rounded-2xl"
          )}
          onChangeText={(e) => {
            setPassword(e);
          }}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
        ></TextInput>
        <TextInput
          style={tailwind(
            "w-64 p-2 text-center bg-white h-12 mb-10 rounded-2xl"
          )}
          onChangeText={(e) => {
            setConfirmPassword(e);
          }}
          placeholder="Confirm password"
          keyboardType="default"
          secureTextEntry={true}
        ></TextInput>
        <TouchableOpacity
          style={[
            tailwind("w-52 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
          onPress={async () => {
            await register(email, password, confirmPassword);
          }}
        >
          <Text style={tailwind("font-bold text-center")}>Create account</Text>
        </TouchableOpacity>
        <View style={tailwind("flex flex-row mt-4")}>
          <TouchableOpacity
            style={tailwind("p-4")}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={tailwind("font-semibold text-white text-center")}>
              Sign in with account ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind("p-4")}
            onPress={() => navigation.navigate("GoogleLogin")}
          >
            <Text style={tailwind("font-semibold text-white text-center")}>
              Sign in with Google ?
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

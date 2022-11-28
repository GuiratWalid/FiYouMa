import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const tailwind = useTailwind();
  return (
    <View>
      <SafeAreaView style={tailwind("h-full")}>
        <View style={tailwind("pt-12 items-center")}>
          <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
            <Text style={tailwind("text-blue-800 font-semibold")}>
              Hello Tailwind
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

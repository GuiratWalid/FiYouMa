import { View, Text, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const tw = useTailwind();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });

  return (
    <View>
      <Text style={tw("")}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

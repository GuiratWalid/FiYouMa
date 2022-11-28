import { View, Text, Button } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";

const HomeScreen = ({ navigation }) => {
  const tw = useTailwind();

  return (
    <View>
      <Text style={tw("")}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

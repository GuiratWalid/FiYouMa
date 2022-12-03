import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";

const SenderMessage = ({ message }) => {
  const tailwind = useTailwind();
  return (
    <View
      style={{
        alignSelf: "flex-end",
        backgroundColor: "#CA5CDD",
        padding: 8,
        marginRight: 15,
        marginVertical: 5,
        borderRadius: 10,
      }}
    >
      <Text style={tailwind("text-white")}>{message}</Text>
    </View>
  );
};

export default SenderMessage;

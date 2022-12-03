import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useTailwind } from "tailwind-rn";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatHeader = ({ title, callEnbaled }) => {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View style={tailwind("mt-10 flex-row items-center justify-between")}>
      <View style={tailwind("flex flex-row items-center")}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tailwind("p-2")}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={tailwind("text-2xl font-bold")}>{title}</Text>
      </View>
      {callEnbaled && (
        <TouchableOpacity style={tailwind("rounded-full p-3 mx-5 bg-red-200")}>
          <Foundation
            style={tailwind("")}
            name="telephone"
            size={20}
            color="red"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatHeader;

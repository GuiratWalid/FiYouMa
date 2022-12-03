import { TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";

const HomeFooter = ({ swipeRef }) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex flex-row justify-evenly mb-12")}>
      <TouchableOpacity
        onPress={() => swipeRef.current.swipeLeft()}
        style={tailwind(
          "items-center justify-center rounded-full w-16 h-16 bg-red-200"
        )}
      >
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => swipeRef.current.swipeRight()}
        style={tailwind(
          "items-center justify-center rounded-full w-16 h-16 bg-green-200"
        )}
      >
        <AntDesign name="heart" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeFooter;

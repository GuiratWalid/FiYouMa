import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const { user } = useAuth();
  return (
    <TouchableOpacity
      style={[
        tailwind("flex-row items-center p-3 bg-white rounded-xl"),
        styles.cardShadow,
        { marginHorizontal: 10, marginVertical: 5 },
      ]}
      onPress={() => navigation.navigate("Messages", { matchDetails })}
    >
      <Image
        style={[
          tailwind("rounded-full h-16 w-16"),
          {
            marginRight: 5,
          },
        ]}
        source={{ uri: matchDetails?.item?.photoURL }}
      />
      <View>
        <Text style={tailwind("text-lg font-semibold")}>
          {matchDetails?.item?.firstName + " " + matchDetails?.item?.lastName}
        </Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

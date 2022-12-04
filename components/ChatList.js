import { View, Text, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const tailwind = useTailwind();
  const { getAllMatches } = useAuth();

  useLayoutEffect(() => {
    const getAllOtherMatches = async () => {
      const allMatches = await getAllMatches();
      setMatches(allMatches);
    };
    getAllOtherMatches();
  }, []);
  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tailwind("p-5 flex-1 items-center justify-center")}>
      <Text style={tailwind("text-center text-lg")}>
        No matches at the moment 😢
      </Text>
    </View>
  );
};

export default ChatList;

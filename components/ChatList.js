import { View, Text, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const tailwind = useTailwind();
  const { user } = useAuth();

  useLayoutEffect(() => {
    setMatches([
      {
        id: "123",
        firstName: "Walid",
        lastName: "Guirat",
        job: "Software engineer",
        photoURL:
          "https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/283889213_5371788816206177_8353715117781829547_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=hTSiPhy13HEAX_YQPgb&_nc_ht=scontent.ftun14-1.fna&oh=00_AfDT6cK5eQK3hrU0c4pAVBPg5Yumaky8z8SpogZ1bbTnOw&oe=638F4B40",
        age: 24,
      },
      {
        id: "456",
        firstName: "Mohamed Ali",
        lastName: "Ghraieb",
        job: "Mechanical engineer",
        photoURL:
          "https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/313406058_5624022434341289_8889043509133358147_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jfw0fkair7YAX-jmoRu&_nc_ht=scontent.ftun14-1.fna&oh=00_AfDUNw4m-bL5DZvu2yYhyH9iVYidhiah_UUgymiRxXN00Q&oe=6390B363",
        age: 23,
      },
    ]);
  }, []);
  return matches.length > 2 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tailwind("p-5 flex-1 items center justify-center")}>
      <Text style={tailwind("text-center text-lg")}>
        No matches at the moment 😢
      </Text>
    </View>
  );
};

export default ChatList;

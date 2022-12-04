import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import initfirebase from "../config/firebase";

const firestore = getFirestore(initfirebase);

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const tailwind = useTailwind();
  const { getAllMatches, user } = useAuth();

  useEffect(() => {
    // const getAllOtherMatches = async () => {
    //   const allMatches = await getAllMatches();
    //   setMatches(allMatches);
    // };
    // getAllOtherMatches();
    onSnapshot(
      query(
        collection(firestore, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapshot) => {
        setMatches(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
    console.log(matches);
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

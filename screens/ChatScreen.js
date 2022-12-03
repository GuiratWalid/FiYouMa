import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import { useTailwind } from "tailwind-rn";

const ChatScreen = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("")}>
        <ChatHeader title="Chat" callEnbaled={true} />
        <ChatList />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

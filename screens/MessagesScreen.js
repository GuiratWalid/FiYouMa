import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";

const MessagesScreen = () => {
  const [input, setInput] = useState("");
  const tailwind = useTailwind();
  const { params } = useRoute();
  const { matchDetails } = params;
  const [messages, setMessages] = useState([
    { id: 1, message: "Bonjour", from: "me" },
    { id: 1, message: "Bonjour", from: "other" },
    { id: 1, message: "Comment ça va ?", from: "me" },
    { id: 1, message: "Très bien et toi ?", from: "other" },
    { id: 1, message: "Bien", from: "me" },
    { id: 1, message: "Cool", from: "me" },
    { id: 1, message: "Quoi de neuf ?", from: "other" },
    {
      id: 1,
      message:
        "J'ai décidé de quitter le pays. Je vais poursuivre mes études en Italie",
      from: "other",
    },
  ]);
  const sendMessage = () => {
    if (input) {
      setMessages([
        ...messages,
        { id: messages.length + 1, message: input, from: "me" },
      ]);
      setInput("");
    }
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <ChatHeader
        callEnbaled={true}
        title={
          matchDetails?.item?.firstName + " " + matchDetails?.item?.lastName
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tailwind("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={[tailwind("pl-4")]}
            keyExtractor={(item) => item.id}
            renderItem={(item) => {
              return item?.item?.from === "me" ? (
                <SenderMessage key={item.id} message={item?.item?.message} />
              ) : (
                <ReceiverMessage
                  key={item?.item?.id}
                  message={item?.item?.message}
                  photoURL={matchDetails?.item?.photoURL}
                />
              );
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={tailwind(
            "flex-row justify-between items-center border border-gray-200 px-5 py-5"
          )}
        >
          <TextInput
            style={tailwind("h-10 text-lg")}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={tailwind("p-3 bg-gray-100 rounded-xl")}
          >
            <Ionicons name="send-sharp" size={34} color="#FF5864" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect, useRef } from "react";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import Swiper from "react-native-deck-swiper";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const { user, logout } = useAuth();

  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    // load data from firebase
  });

  const data = [
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
    {
      id: "789",
      firstName: "Wassim",
      lastName: "Guirat",
      job: "Electric engineer",
      photoURL:
        "https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/271605380_486600289520135_4775255171374812148_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=PD5Clb7nn_cAX8F970e&_nc_ht=scontent.ftun14-1.fna&oh=00_AfAgreg_TzlQiy3Fys2XW4xaVuIayOk5l6u_7E1p25hWIA&oe=638F7B68",
      age: 22,
    },
  ];

  const swipeLeft = async (cardIndex) => {
    if (!data[cardIndex]) return;
    const userSwipped = data[cardIndex];
    console.log("You swipped PASS on " + userSwipped.id);
  };

  const swipeRight = async (cardIndex) => {
    if (!data[cardIndex]) return;
    const userSwipped = data[cardIndex];
    console.log("You swipped MATCH on " + userSwipped.id);
    navigation.navigate("Matched", { loggedInProfile: user, userSwipped });
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      {/* <HomeHeader photoURL={user.photoURL} /> */}
      <View
        style={tailwind("flex-row items-center justify-between relative px-5")}
      >
        <TouchableOpacity onPress={logout}>
          <Image
            style={tailwind("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Modal")}
          style={tailwind("mt-2")}
        >
          <Image
            style={tailwind("h-16 w-14")}
            source={require("../assets/images/logo1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubble-sharp" size={35} color="#FF5864" />
        </TouchableOpacity>
      </View>
      <View style={tailwind("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={data}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity={true}
          onSwipedLeft={swipeLeft}
          onSwipedRight={swipeRight}
          backgroundColor={"#4FDBE9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card.id}
                style={tailwind("relative bg-white h-3/4 rounded-xl")}
              >
                <Image
                  style={tailwind("absolute top-0 h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={[
                    tailwind(
                      "absolute bottom-0 bg-white w-full flex-row justify-between h-20 px-6 py-2 rounded-b-xl"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tailwind("text-xl font-bold")}>
                      {card.firstName} {card.lastName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tailwind("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tailwind(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tailwind("font-bold pb-5")}>No more profiles</Text>
                <Image
                  style={tailwind("h-20 w-20")}
                  source={require("../assets/images/sad.png")}
                />
              </View>
            )
          }
        />
      </View>
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
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.14,
    elevation: 2,
  },
});

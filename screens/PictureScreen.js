import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";
import initfirebase from "../config/firebase";

const storage = getStorage(initfirebase);

const PictureScreen = () => {
  const [image, setImage] = useState("");
  const { updatePhoto, user } = useAuth();
  const navigation = useNavigation();
  const tailwind = useTailwind();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const uploadImage = async (uri) => {
    //convert image to blob
    const blob = await imageToBlob(uri);
    //save blob to ref image
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + user.uid + ".jpg");

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    await getDownloadURL(storageRef).then((downloadURL) => {
      setImage(downloadURL);
    });
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request Failed"));
      };
      xhr.responseType = "blob"; //arraybuffer
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };
  return (
    <View style={tailwind("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tailwind("flex-1 items-center justify-center")}
        source={require("../assets/images/background1.png")}
      >
        <Text style={tailwind("text-white text-3xl mb-10 font-bold")}>
          UPLOAD IMAGE
        </Text>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={[tailwind("mb-8 rounded-full"), { height: 150, width: 150 }]}
            source={
              image == ""
                ? require("../assets/images/emptyImage.png")
                : { uri: image }
            }
          />
        </TouchableOpacity>
        <Text style={tailwind("text-white mb-5 font-bold")}>
          _____________________ OR _____________________
        </Text>
        <TextInput
          style={tailwind(
            "w-80 p-2 text-center bg-white h-12 mb-16 mt-5 rounded-2xl"
          )}
          onChangeText={(e) => {
            setImage(e);
          }}
          placeholder="Photo URL"
          value={image}
        ></TextInput>
        <TouchableOpacity
          style={[
            tailwind("w-52 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
          onPress={async () => {
            await updatePhoto(image);
          }}
        >
          <Text style={tailwind("font-bold text-center")}>Save Photo</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default PictureScreen;

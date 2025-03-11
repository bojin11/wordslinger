import React, { useState } from "react";
import { Image, ImageBackground } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./contexts/username";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { CurrentRenderContext, useNavigation } from "@react-navigation/native";

interface Users {
  [key: string]: string;
}

interface VerifyResponse {
  username: string;
  verification: boolean;
}

export default function Login({ navigation, route }: any) {
  const navigateTo = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const { user, setUser } = useAuth();

  const backgroundUI = {
    background: require("../assets/Background4.png"),
    moutain: require("../assets/Background2.png"),

    cloud1: require("../assets/Cloud1.png"),
    cloud2: require("../assets/Cloud2.png"),
    cloud3: require("../assets/Cloud3.png"),
    cloud4: require("../assets/Cloud4.png"),
  };

  function validUsernameCheck(username: string, password: string) {
    axios
      .post<VerifyResponse>(
        "https://wordslingerserver.onrender.com/api/verify",
        { username: username, password: password }
      )
      .then(({ data: { verification, username } }) => {
        if (verification) {
          setUser(username);
          setIsInvalidUsername(false);
          route.params.setIsLoggedIn(true);
        } else {
          setIsInvalidUsername(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <ImageBackground
        style={{ flex: 1, height: "100%", width: "100%" }}
        source={backgroundUI.background}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            overflow: "hidden",
            justifyContent: "flex-start",
          }}
        >
          <Image
            style={{ top: 200, right: 200, width: "100%" }}
            source={backgroundUI.cloud1}
          />
          <Image style={{ right: 400 }} source={backgroundUI.cloud2} />
          <Image
            style={{ top: 300, right: 200 }}
            source={backgroundUI.cloud3}
          />
          <Image
            style={{ right: 700, height: "100%" }}
            source={backgroundUI.cloud4}
          />
        </View>
        <Image
          style={{
            position: "absolute",
            bottom: -70,
            resizeMode: "contain",
            width: "100%",
          }}
          source={backgroundUI.moutain}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Login {user}</Text>
          <TextInput
            style={styles.pwInput}
            placeholder="Enter Username"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.pwInput}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button
            title="Login"
            onPress={() => {
              validUsernameCheck(username, password);
            }}
          />
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              navigateTo.navigate("Signup");
            }}
          >
            <Text>Signup</Text>
          </TouchableOpacity>

          {isInvalidUsername ? (
            <Text>Username/password is not correct! </Text>
          ) : null}
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 20,
    maxHeight: "30%",
    maxWidth: "90%",
    backgroundColor: "white",
    position: "relative",
    marginInline: "10%",
    bottom: "40%",
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  // input: {
  //   width: "100%",
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   borderRadius: 5,
  //   marginBottom: 10,
  //   justifyContent: "center",
  //   alignContent: "center",
  //   alignItems: "center",
  // },

  pwInput: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  navButton: {
    borderColor: "#2583ff",
    borderWidth: 1.2,
    borderRadius: 14,
    height: 60,
    width: 60,
  },
  // iconContainer: {
  //   marginInlineEnd: 5,
  //   alignContent: "space-between",
  // },
  // image: {
  //   height: "100%",
  //   width: "100%",
  // },
});

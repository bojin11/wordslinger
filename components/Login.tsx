import React, { useState } from "react";
import { Image, ImageBackground } from "react-native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./contexts/username";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

interface Users {
  [key: string]: string;
}

interface VerifyResponse {
  username: string;
  verification: boolean;
}

export default function Login({ navigation, route }: React.FunctionComponent) {
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
            style={{ top: "75%", left: "-30%", width: "100%" }}
            source={backgroundUI.cloud1}
          />
          <Image
            style={{ top: "75%", right: "100%", zIndex: 3 }}
            source={backgroundUI.cloud2}
          />
          <Image
            style={{ top: "0%", right: "180%" }}
            source={backgroundUI.cloud3}
          />
          <Image
            style={{ top: "15%", right: "160%" }}
            source={backgroundUI.cloud4}
          />
        </View>

        <Image
          style={{
            position: "absolute",
            bottom: "0%",
            resizeMode: "stretch",
            width: "110%",
          }}
          source={backgroundUI.moutain}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Log in{user}</Text>
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
          <TouchableOpacity
            style={buttonStyling.buttonContainer}
            onPress={() => {
              validUsernameCheck(username, password);
            }}
          >

            <View style={buttonStyling.buttonActive}>
              <Text style={buttonStyling.buttonActiveText}>Log in</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyling.buttonContainer}
            onPress={() => {
              navigateTo.navigate("Signup");
            }}
          >

            <View style={buttonStyling.buttonActive}>
              <Text style={buttonStyling.buttonActiveText}>Sign up</Text>
            </View>

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
    padding: "7%",
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 20,
    maxHeight: "40%",
    maxWidth: "90%",
    backgroundColor: "white",
    position: "relative",
    marginInline: "10%",
    bottom: "40%",
  },
  title: {
    fontSize: 24,
    marginBottom: "7.5%",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  pwInput: {
    width: "80%",
    padding: "2.5%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  navButton: {
    borderColor: "#2583ff",
    borderWidth: 1.2,
    borderRadius: 14,
    height: 40,
    width: 80,
    alignItems: "center",
  },
});

const buttonStyling = StyleSheet.create({
  buttonContainer: {
    margin: "1%",
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
  },
  buttonActive: {
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#878787",
    width: "150%",
  },
  buttonActiveText: {
    backgroundColor: "#BFBFBF",
    maxHeight: 80,
    color: "black",
    padding: 2,
    borderRadius: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  buttonInactive: {
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#878787",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#BFBFBF",
    width: "25%",
  },
  buttonInactiveText: {
    backgroundColor: "#878787",
    maxHeight: 80,
    color: "white",
    padding: 2,
    borderRadius: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  textLargeOverlay: {
    position: "absolute",
    top: "65%",
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
    zIndex: 2,
  },
  textSmallOverlay: {
    position: "absolute",
    top: "65%",
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 2,
  },
});

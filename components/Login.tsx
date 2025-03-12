import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import { useAuth } from "./contexts/username";
import axios from "axios";

interface Users {
  [key: string]: string;
}

interface VerifyResponse {
  username: string;
  verification: boolean;
}

export default function Login({ navigation, route }: any) {
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
            height: "110%",
            zIndex: 1,
          }}
          source={backgroundUI.moutain}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Login {user}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.pwInput}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
          />
          <Button
            title="Login"
            onPress={() => {
              validUsernameCheck(username, password);
            }}
          />
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
    padding: "5%",
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
  },
});

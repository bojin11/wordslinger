import React, { useState } from "react";
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
import { Signup } from "./Signup";
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

export default function Login({ navigation, route }: any) {
  const navigateTo = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const { user, setUser } = useAuth();

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
      {/* <View>
        <NavigationIndependentTree>
          <Stack.Screen name="Signup" component={Signup} />
        </NavigationIndependentTree>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },

  navbar: {
    flex: 1,
    flexDirection: "row",
    position: "static",
    left: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    padding: "3.5%",
    zIndex: 1,
    borderTopWidth: 2,
    maxHeight: "10%",
  },
  navButton: {
    borderColor: "#2583ff",
    borderWidth: 1.2,
    borderRadius: 14,
    height: 60,
    width: 60,
  },
  iconContainer: {
    marginInlineEnd: 5,
    alignContent: "space-between",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

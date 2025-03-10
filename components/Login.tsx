import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "./contexts/username";
import axios from "axios";

interface Users {
  [key: string]: string;
}

interface VerifyResponse {
  username: string;
  verification: boolean;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const { user, setUser } = useAuth();

  function validUsernameCheck(username: string, password: string) {
    axios
      // .get("https://wordslingerserver.onrender.com/api/users")
      // .then(({ data: { users } }) => {
      //   console.log(users);
      // })
      .post(
        "https://wordslingerserver.onrender.com/api/verify/",
        {
          username: username,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(({ data: { verification, username } }) => {
        if (verification) {
          setUser(username);
          setIsInvalidUsername(false);
          console.log("valid");
          //please add nav to learner or home page here!
        } else {
          setIsInvalidUsername(true);
          console.log("invalid");
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
        {isInvalidUsername ? (
          <Text>Username/password is not correct! </Text>
        ) : null}
      </View>
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
});

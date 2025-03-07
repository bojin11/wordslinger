import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "./contexts/username";

interface Users {
  [key: string]: string;
}
const validUsersFromApiCall: Users = {
  slickjimmy1992: "TheSearchers1956",
  XXcharliethebeastXX: "Unforgiven1992",
  rawr: "Stagecoach1939",
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const { user, setUser } = useAuth();

  function validUsernameCheck() {
    if (
      validUsersFromApiCall[username] &&
      validUsersFromApiCall[username] === password
    ) {
      setUser(username);
      Alert.alert("Howdy Partner!");
    } else {
      setIsInvalidUsername(true);
    }
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
        <Button title="Login" onPress={validUsernameCheck} />
        {isInvalidUsername ? <Text>Not a valid user! </Text> : null}
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

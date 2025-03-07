import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "./contexts/username";

const validUsersFromApiCall = ["slickjimmy1992", "XXcharliethebeastXX", "rawr"];

export default function Login() {
  const [username, setUsername] = useState("");
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const { user, setUser } = useAuth();

  function validUsernameCheck() {
    if (validUsersFromApiCall.includes(username)) {
      setUser(username);
    } else {
      setIsInvalidUsername(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login {user}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Login" onPress={validUsernameCheck} />
      {isInvalidUsername ? (
        <Text>Not a valid username! Please try another:)</Text>
      ) : null}
    </View>
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
});

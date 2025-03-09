import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./contexts/username";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Learn() {
  const { user, setUser } = useAuth();
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.learn}>
        <Text>Time to Learn</Text>
      </View>
      <View style={styles.buttContainer}></View>
    </>
  );
}

const styles = StyleSheet.create({
  learn: {
    backgroundColor: "green",
    marginBottom: 15,
  },
  buttContainer: {
    alignItems: "flex-end",
    padding: 20,
    borderStyle: "solid",
  },
  button: {
    width: 100,
    padding: 10,

    backgroundColor: "green",
    borderColor: "#001E00",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 24,
  },
  loginText: {},
});

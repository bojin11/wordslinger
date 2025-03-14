import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function ToggleButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 9,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "grey",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

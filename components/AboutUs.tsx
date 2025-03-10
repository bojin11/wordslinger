import { Text, View, StyleSheet } from "react-native";
import React from "react";
export default function Footer() {
  return <View style={styles.footer}></View>;
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});

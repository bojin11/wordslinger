import { Text, View, StyleSheet } from "react-native";
import React from "react";

export default function Practice() {
  return (
    <View style={styles.practice}>
      <Text>practice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  practice: {
    backgroundColor: "grey",
  },
});

import { Text, View, StyleSheet } from "react-native";
import React from "react";

export default function Review() {
  return (
    <View style={styles.practice}>
      <Text>Review</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  practice: {
    backgroundColor: "grey",
  },
});

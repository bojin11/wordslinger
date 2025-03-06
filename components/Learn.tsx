import { Text, View, StyleSheet } from "react-native";

export default function Learn() {
  return (
    <View style={styles.learn}>
      <Text>Time to Learn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  learn: {
    backgroundColor: "green",
  },
});

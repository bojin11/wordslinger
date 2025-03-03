import { Text, View, StyleSheet } from "react-native";

export default function Leaderboard() {
  return (
    <View style={styles.leaderboard}>
      <Text>leaderboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderboard: {
    backgroundColor: "grey",
  },
});

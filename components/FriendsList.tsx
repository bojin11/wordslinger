import { Text, View, StyleSheet } from "react-native";

export default function FriendsList() {
  return (
    <View style={styles.friendsList}>
      <Text>Friends list</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  friendsList: {
    backgroundColor: "grey",
  },
});

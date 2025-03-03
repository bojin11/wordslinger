import { Text, View, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    padding: 18,
  },
});

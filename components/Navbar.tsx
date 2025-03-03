import { Text, View, StyleSheet } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <View style={styles.iconContainer}>
        <Text>home</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    zIndex: 1,
  },
  iconContainer: {
    backgroundColor: "grey",
  },
});

import React from "react";
import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
const whiskey = require("../assets/icons/Whiskey.png");

export default function Header() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook

  return (
    <View style={styles.header}>
      <Text>Word Slinger</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image
            style={[styles.image, { resizeMode: "center" }]}
            source={whiskey}
          />
        </TouchableOpacity>
      </View>
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
  navbar: {
    flex: 1,
    flexDirection: "row",

    position: "static",
    left: 0,
    bottom: 0,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 15,
    zIndex: 1,
    display: "flex",
    borderTopWidth: 2,
    maxHeight: "10%",
    overflow: "scroll",
  },
  iconContainer: {
    marginInlineEnd: 5,
  },
  image: {
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: "green",
    height: 60,
    width: 75,
  },
});

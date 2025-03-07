import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import React from "react";
const sheriff = require("../assets/icons/Sheriff.png");
const cactus = require("../assets/icons/Cactus2.png");
const hayStack = require("../assets/icons/hay-large.png");
const barrel = require("../assets/icons/barrel.png");
const whiskey = require("../assets/icons/Whiskey.png");
const chariot = require("../assets/icons/chariot.png");

const Navbar: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook

  return (
    <View style={styles.navbar}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={[styles.image, { resizeMode: "center" }]}
            source={chariot}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Learn")}>
          <Image
            style={[styles.image, { resizeMode: "center" }]}
            source={sheriff}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Practice")}>
          <Image
            style={[styles.image, { resizeMode: "center" }]}
            source={hayStack}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Game")}>
          <Image
            style={[styles.image, { resizeMode: "center" }]}
            source={cactus}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("FriendsList")}>
          <Image
            style={[styles.image, { resizeMode: "center" }]}
            source={whiskey}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Leaderboard")}>
          <Image
            style={[styles.image, { resizeMode: "center" }]}
            source={barrel}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Navbar;
const styles = StyleSheet.create({
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

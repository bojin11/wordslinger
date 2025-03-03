import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import Learn from "./Learn";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";

const sheriff = require("../assets/icons/Sheriff.png");
const cactus = require("../assets/icons/Cactus2.png");
const hayStack = require("../assets/icons/hay-large.png");
const barrel = require("../assets/icons/barrel.png");
const whiskey = require("../assets/icons/Whiskey.png");
const box = require("../assets/icons/Box1.png");
type ImageExampleProps = {
  navigation: StackNavigationProp<RootStackParamList, "Learn">;
};
const Navbar: React.FC<ImageExampleProps> = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <View style={styles.iconContainer}>
        <Image
          style={[styles.image, { resizeMode: "center" }]}
          source={sheriff}
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Learn")}>
          <Image
            style={[styles.image, { resizeMode: "center" }]}
            source={hayStack}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <Image
          style={[styles.image, { resizeMode: "center" }]}
          source={cactus}
        />
      </View>
      <View style={styles.iconContainer}>
        <Image
          style={[styles.image, { resizeMode: "center" }]}
          source={whiskey}
        />
      </View>
      <View style={styles.iconContainer}>
        <Image
          style={[styles.image, { resizeMode: "center" }]}
          source={barrel}
        />
      </View>
      <View style={styles.iconContainer}>
        <Image style={[styles.image, { resizeMode: "center" }]} source={box} />
      </View>
    </View>
  );
};
export default Navbar;
const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 15,
    zIndex: 1,
    display: "flex",
    borderTopWidth: 2,
  },
  iconContainer: {},
  image: {
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: "green",
    height: 60,
    width: 75,
  },
});

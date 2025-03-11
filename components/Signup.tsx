import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./contexts/username";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";

import { useNavigation } from "@react-navigation/native";

export default function Signup() {
  return (
    <View style={styles.navbar}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    flexDirection: "row",
    position: "static",
    left: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    padding: "3.5%",
    zIndex: 1,
    borderTopWidth: 2,
    maxHeight: "10%",
  },
  navButton: {
    borderColor: "#2583ff",
    borderWidth: 1.2,
    borderRadius: 14,
    height: 60,
    width: 60,
  },
  iconContainer: {
    marginInlineEnd: 5,
    alignContent: "space-between",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

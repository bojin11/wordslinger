import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { Language, LeaderboardEntry } from "../types/Leaderboard";
const languagesData = [
  {
    value: "German",
    lable: "German",
    image: require("../assets/icons/germany.svg"),
  },
  {
    value: "French",
    lable: "French",
    image: require("../assets/icons/france.svg"),
  },
  {
    value: "Spanish",
    lable: "Spanish",
    image: require("../assets/icons/spain.svg"),
  },
];

const SelectLanguageMultiplayer = ({
  language,
  setLanguage,
  setLanguageNotSelected,
}: {
  language: Language;
}) => {
  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={language}
      data={languagesData}
      valueField="value"
      labelField="lable"
      imageField="image"
      placeholder="Select language"
      onChange={(e) => {
        setLanguageNotSelected(false);
        setLanguage(e.value);
      }}
    />
  );
};

export default SelectLanguageMultiplayer;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

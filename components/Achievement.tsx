import { Image, Text, View } from "react-native";
import React from "react";
const testAchievementIcon = require("../assets/icons/TNT.png");

export default function Achievement({
  achievementName,
  isUnlocked,
}: {
  achievementName: string;
  isUnlocked: boolean;
}) {
  return (
    <View
      style={{
        borderWidth: 2,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
      }}
    >
      {isUnlocked ? (
        <Image source={testAchievementIcon}></Image>
      ) : (
        <Image source={testAchievementIcon} style={{ opacity: 0.3 }}></Image>
      )}
      <Text>{achievementName}</Text>
    </View>
  );
}

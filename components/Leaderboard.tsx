import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import LanguageDropDownBar from "./LanguageDropDownBar";
const leaderboardData = require("../testdata/leaderboard");
import { Language, LeaderboardEntry } from "../types/Leaderboard";
//data coming in > [{username, language, rank, avatar_url}...]

const languageIcons = {
  German: require("../assets/icons/germany.svg"),
  French: require("../assets/icons/france.svg"),
  Spanish: require("../assets/icons/spain.svg"),
};

export default function Leaderboard() {
  const [language, setLanguage] = useState<Language | null>(null);

  const sortedLeaderboard: LeaderboardEntry[] = [...leaderboardData].sort(
    (a, b) => {
      return b.rank - a.rank;
    }
  );

  const filteredLeaderboard: LeaderboardEntry[] = language
    ? sortedLeaderboard.filter((leaderboardEntry) => {
        return leaderboardEntry.language === language;
      })
    : sortedLeaderboard;

  return (
    <View style={styles.leaderboard}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}>leaderboard!</Text>
        <LanguageDropDownBar language={language} setLanguage={setLanguage} />
        <View style={styles.podiumContainer}>
          {[1, 0, 2].map((podiumIndex, index) => {
            const entry = filteredLeaderboard[podiumIndex];
            return (
              <View
                key={entry.username + entry.language}
                style={(styles.podium, styles[`position${podiumIndex}`])}
              >
                <Image
                  source={{ uri: entry.avatar_url }}
                  style={styles.podiumAvatar}
                />
                <Text style={styles.username}>{entry.username}</Text>
                <Text style={styles.points}>{entry.rank}</Text>

                <Image
                  source={languageIcons[entry.language]}
                  style={styles.icon}
                />
              </View>
            );
          })}
        </View>

        <FlatList
          data={filteredLeaderboard.slice(3)}
          keyExtractor={(leaderboardEntry) => {
            return leaderboardEntry.username + leaderboardEntry.language;
          }}
          renderItem={({ item, index }) => (
            <View style={styles.regularEntry}>
              <Text style={styles.rankPosition}>{index + 4}</Text>
              <View style={styles.entryDetails}>
                <Image
                  source={{ uri: item.avatar_url }}
                  style={styles.avatar}
                />
                <Text
                  style={styles.regularUsername}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.username}
                </Text>
              </View>
              <Text style={styles.regularPoints}>{item.rank}</Text>

              <Image
                source={languageIcons[item.language]}
                style={styles.regularIcon}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  leaderboard: {
    flex: 1,
    backgroundColor: "#D4DF9E",
    padding: 16,
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 15,
    marginBottom: 50,
  },
  podium: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  position0: {
    backgroundColor: "#FFD700",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 15,
    width: 120,
    height: 160,
  },
  position1: {
    backgroundColor: "#C0C0C0",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 120,
    height: 160,
  },
  position2: {
    backgroundColor: "#CD7F32",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 120,
    height: 160,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  points: {
    fontSize: 14,
    color: "#555",
  },
  icon: {
    width: 24,
    height: 24,
  },
  regularEntry: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
    width: "90%",
    minWidth: 300,
    justifyContent: "space-between",
    flexShrink: 0,
  },
  entryDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rankPosition: {
    fontWeight: "bold",
    marginRight: 10,
    width: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  regularUsername: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
    minWidth: 80,
    maxWidth: "90%",
  },
  regularIcon: {
    width: 24,
    height: 24,
    marginLeft: "auto",
  },
  regularPoints: {
    fontSize: 14,
    color: "#555",
    marginRight: 15,
    minWidth: 25,
  },
});

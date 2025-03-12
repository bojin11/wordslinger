import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import LanguageDropDownBar from "./LanguageDropDownBar";
import { Language, LeaderboardEntry } from "../types/Leaderboard";
import axios from "axios";
//data coming in > [{username, language, rank, avatar_url}...]
type User = {
  user_id: Number;
  username: String;
  password: String;
  name: String;
  avatar_url: String;
  role: "admin" | "user";
  bio: String;
};
const languageIcons = {
  German: require("../assets/icons/germany.svg"),
  French: require("../assets/icons/france.svg"),
  Spanish: require("../assets/icons/spain.svg"),
};

export default function Leaderboard() {
  const UiImages = {
    background: require("../assets/wild-west-town.png"),
  };
  const [leaderboardData, setLeaderboardData] = useState<
    LeaderboardEntry[] | null
  >(null);
  const [language, setLanguage] = useState<Language | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    axios
      .get("https://wordslingerserver.onrender.com/api/leaderboard")
      .then(({ data: { leaderboardEntries } }) => {
        setLeaderboardData(leaderboardEntries);
        return axios.get("https://wordslingerserver.onrender.com/api/users");
      })
      .then(({ data: { users } }) => {
        setLeaderboardData((leaderboardEntries: any) => {
          return leaderboardEntries?.map(
            (leaderboardEntry: LeaderboardEntry) => {
              const relevantUser = users.find(
                (user: User) => user.user_id === leaderboardEntry.user_id
              );

              return relevantUser
                ? {
                    ...leaderboardEntry,
                    username: relevantUser.username,
                    avatar_url: relevantUser.avatar_url,
                  }
                : leaderboardEntry;
            }
          );
        });
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  const sortedLeaderboard: LeaderboardEntry[] = [
    ...(leaderboardData ?? []),
  ].sort((a, b) => {
    return b.rank - a.rank;
  });

  const filteredLeaderboard: LeaderboardEntry[] = language
    ? sortedLeaderboard.filter((leaderboardEntry) => {
        return leaderboardEntry.language === language;
      })
    : sortedLeaderboard;

  return (
    <ImageBackground
      style={{ flex: 1, height: "100%", width: "100%" }}
      source={UiImages.background}
    >
      <View style={styles.leaderboard}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.scroll}
        >
          <Text style={styles.title}>leaderboard!</Text>
          {isLoading ? (
            <View>
              <Image
                source={require("../assets/tumbleweedtransparent.gif")}
                style={{
                  width: "1000%",
                  height: "1000%",
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
              />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <>
              <LanguageDropDownBar
                language={language}
                setLanguage={setLanguage}
              />
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
            </>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  leaderboard: {
    flex: 1,
    padding: "1%",
    alignItems: "center",
    width: "98%",
  },
  scroll: {
    width: "98%",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "10%",
    gap: "1%",
    margin: 0,
    marginBottom: "5%",
    height: 150,
    width: "100%",
  },
  podium: {
    alignItems: "center",
    padding: "1%",
    borderRadius: 10,
    flex: 1,
  },
  position0: {
    backgroundColor: "#FFD700",
    alignItems: "center",
    padding: "1%",
    borderRadius: 15,
    marginHorizontal: "1%",
    width: "30%",
    height: "100%",
    marginBottom: "10%",
  },
  position1: {
    backgroundColor: "#C0C0C0",
    alignItems: "center",
    padding: "1%",
    borderRadius: 10,
    marginHorizontal: "1%",
    width: "30%",
    height: "100%",
  },
  position2: {
    backgroundColor: "#CD7F32",
    alignItems: "center",
    padding: "1%",
    borderRadius: 10,
    marginHorizontal: "1%",
    width: "30%",
    height: "100%",
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: "100%",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
    minWidth: "50%",
    maxWidth: "90%",
    flexWrap: "wrap",
  },
  points: {
    fontSize: 14,
    color: "#555",
  },
  icon: {
    width: "15%",
    height: "15%",
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

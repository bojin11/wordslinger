import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { ProfileLanguage } from "../types/ProfileTypes";
import React from "react";
import Achievement from "./Achievement";
import { GameResult } from "../types/GameResusltsType";

//Want username, avatar url, and bio and also the data in the array below, for a specific user
const testLanguageData: Array<ProfileLanguage> = [
  {
    language: "French",
    numOfBeginnerWords: 0,
    numOfIntermediateWords: 0,
    numOfMasterWords: 0,
  },
  {
    language: "German",
    numOfBeginnerWords: 5,
    numOfIntermediateWords: 3,
    numOfMasterWords: 7,
  },
  {
    language: "Spanish",
    numOfBeginnerWords: 0,
    numOfIntermediateWords: 0,
    numOfMasterWords: 0,
  },
];
const testGameResults: Array<GameResult> = [
  {
    userId: "1",
    gameNumber: 1,
    result: "Loss",
    wordsCorrect: "apple, banana",
    wordsWrong: "plum, pencil, bread",
  },
  {
    userId: "1",
    gameNumber: 2,
    result: "Win",
    wordsCorrect: "apple, banana, bread",
    wordsWrong: "plum, pencil",
  },
];
//Child component to map and render language cards
function LanguageCard({
  language,
  numOfBeginnerWords,
  numOfIntermediateWords,
  numOfMasterWords,
}: ProfileLanguage) {
  const languageBackground = styles[`${language}`];
  return (
    <View style={[styles.card, languageBackground]}>
      <Text style={styles.textHeader}>{language}</Text>
      <Text style={styles.langText}>Beginner: {numOfBeginnerWords}</Text>
      <Text style={styles.langText}>
        Intermediate: {numOfIntermediateWords}
      </Text>
      <Text style={styles.langText}>Master: {numOfMasterWords}</Text>
    </View>
  );
}
function StatsCard({
  gameNumber,
  result,
  wordsCorrect,
  wordsWrong,
}: GameResult) {
  return (
    <View style={styles.statsCard}>
      <Text style={styles.gameNo}>Game {gameNumber}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.statsText}>Result: {result}</Text>
        <Text style={styles.statsText}>Correct Words: {wordsCorrect}</Text>
        <Text style={styles.statsText}>Incorrect Words: {wordsWrong}</Text>
      </View>
    </View>
  );
}
//Want the achievement data for a given user
const testAchievementData: [string, boolean][] = [
  ["5 words mastered!", true],
  ["10 words mastered!", false],
];

export default function Profile() {
  return (
    <ScrollView style={{ flex: 1, height: "100%", marginInline: "auto" }}>
      <View style={styles.container}>
        <View style={styles.avatarCard}>
          <Image
            style={styles.tinyProfilePic}
            source={{
              uri: "https://avatars.githubusercontent.com/u/24693797",
            }}
            alt="Profile picture"
          />
          <Text>Axel_Nicolas-Emmerich54</Text>
        </View>
        <View style={styles.bioCard}>
          <Text>blogger, parent, scientist</Text>
        </View>
      </View>

      {testLanguageData.map(
        ({
          language,
          numOfBeginnerWords,
          numOfIntermediateWords,
          numOfMasterWords,
        }) => {
          return (
            <LanguageCard
              language={language}
              numOfBeginnerWords={numOfBeginnerWords}
              numOfIntermediateWords={numOfIntermediateWords}
              numOfMasterWords={numOfMasterWords}
              key={language}
            ></LanguageCard>
          );
        }
      )}
      <View style={[styles.card, { backgroundColor: "pink" }]}>
        <Text style={styles.textHeader}>Achievements</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {testAchievementData.map(([achievementName, isUnlocked]) => {
            return (
              <Achievement
                achievementName={achievementName}
                isUnlocked={isUnlocked}
              ></Achievement>
            );
          })}
        </View>
      </View>
      <View style={[styles.stats, { backgroundColor: "#89CFF0" }]}>
        <Text style={styles.statsHeader}>Game History</Text>
        {testGameResults.map(
          ({ userId, gameNumber, result, wordsCorrect, wordsWrong }) => {
            return (
              <StatsCard
                userId={userId}
                gameNumber={gameNumber}
                result={result}
                wordsCorrect={wordsCorrect}
                wordsWrong={wordsWrong}
                key={gameNumber}
              ></StatsCard>
            );
          }
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "grey",
    marginBlockEnd: 10,
  },
  avatarCard: { marginBlock: 8, alignItems: "center" },
  bioCard: { marginBlock: 8, alignItems: "center" },
  card: {
    width: Dimensions.get("screen").width,
    height: "auto",
    marginBlockEnd: 10,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  French: {
    backgroundColor: "#000091",
  },
  Spanish: {
    backgroundColor: "#FFCC00",
  },
  German: {
    backgroundColor: "#AA151B",
  },
  textHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  langText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    width: Dimensions.get("screen").width - 50,
    backgroundColor: "white",
    marginBlock: 10,
    textAlign: "center",
    borderRadius: 10,
    height: "20%",
  },
  tinyProfilePic: {
    width: 100,
    height: 100,
    borderRadius: 50 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "black",
  },
  stats: {
    width: Dimensions.get("screen").width,
    height: "auto",
    marginBlockEnd: 10,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  statsHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  statsCard: { marginBlock: 8, alignItems: "center" },
  gameNo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  statsText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    width: Dimensions.get("screen").width - 50,
    // backgroundColor: "white",
    marginBlock: 10,
    textAlign: "center",
    // borderRadius: 10,
    height: "20%",
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
});

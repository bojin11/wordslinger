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
import axios from "axios";
import { useAuth } from "./contexts/username";
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

const userProfile = {
  name: "Put your name here",
  username: "Put your username here",
  bio: "Tell us about yourself, partner.",
  avatar_url: "Pick an avatar from below",
};

const image1 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ1OS5wbmc=/794x1000/hnUX4e.png";
const image2 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ1Ny5wbmc=/794x1000/VX87t1.png";
const image3 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ2Mi5wbmc=/794x1000/TvwatB.png";

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

//Want the achievement data for a given user
const testAchievementData: [string, boolean][] = [
  ["5 words mastered!", true],
  ["10 words mastered!", false],
];

export default function Profile() {
  const { user } = useAuth();
  //   const getUserId = () => {
  //     return axios
  //       .get(
  //         `      https://wordslingerserver.onrender.com/api/users/${user}
  // `
  //       )
  //       .then(({ data }) => {
  //         return data.user[0];
  //       });
  //   };

  // const getUser = () => {
  //   const user_id = getUserId();
  //   console.log(user_id);
  //   return axios
  //     .get(`      https://wordslingerserver.onrender.com/api/users/${user_id}`)
  //     .then((result) => {
  //       return result;
  //     });
  // };

  // const userInfo = getUser();
  // console.log(userInfo);

  return (
    <ScrollView style={{ flex: 1, height: "100%", marginInline: "auto" }}>
      <View style={styles.container}>
        <View style={styles.avatarCard}>
          <Image
            style={styles.tinyProfilePic}
            source={{
              uri: "url",
            }}
            alt="Profile picture"
          />
          <Text>{userProfile.username}</Text>
        </View>
        <View style={styles.bioCard}>
          <Text>{userProfile.bio}</Text>
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
});

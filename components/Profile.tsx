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
//Want username, avatar url, and bio and also the data in the array below, for a specific user
const languageData: Array<ProfileLanguage> = [
  {
    language: "French",
    numOfBeginnerWords: 13,
    numOfIntermediateWords: 2,
    numOfMasterWords: 0,
  },
  {
    language: "German",
    numOfBeginnerWords: 5,
    numOfIntermediateWords: 0,
    numOfMasterWords: 0,
  },
  {
    language: "Spanish",
    numOfBeginnerWords: 0,
    numOfIntermediateWords: 0,
    numOfMasterWords: 25,
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
    <View style={[styles.languageCard, languageBackground]}>
      <Text style={styles.langTextHeader}>{language}</Text>
      <Text style={styles.langText}>Beginner: {numOfBeginnerWords}</Text>
      <Text style={styles.langText}>
        Intermediate: {numOfIntermediateWords}
      </Text>
      <Text style={styles.langText}>Master: {numOfMasterWords}</Text>
    </View>
  );
}

export default function Profile() {
  return (
    <View style={{ flex: 1 }}>
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
      <ScrollView
        horizontal={true}
        style={styles.languageContainer}
        pagingEnabled={true}
      >
        {languageData.map(
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
              ></LanguageCard>
            );
          }
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "grey",
    marginBlockEnd: 10,
  },
  languageContainer: {
    flex: 10,
    flexDirection: "row",
    width: "100%",
  },
  avatarCard: { marginBlock: 8, alignItems: "center" },
  bioCard: { marginBlock: 8, alignItems: "center" },
  languageCard: {
    width: Dimensions.get("screen").width,
    height: "70%",
    marginBlockEnd: 8,
    alignItems: "center",
    borderRadius: 10,
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
  langTextHeader: {
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

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ReviewData,
  ReviewCardType,
  LanguageAndWords,
} from "../types/ReviewTypes";

const testReviewData: ReviewData = {
  wordsToReview: {
    French: [
      ["chien", "dog"],
      ["mère", "mother"],
      ["livre", "book"],
    ],
    German: [],
    Spanish: [["perro", "dog"]],
  },
};

const wordsToReviewFormatted: LanguageAndWords = Object.entries(
  testReviewData.wordsToReview
);

function ReviewCard({ language, wordList }: ReviewCardType) {
  const languageBackground = styles[`${language}`];

  const navigation = useNavigation<StackNavigationProp<{ ReviewGame?: any }>>();
  function navigateToLanguage() {
    navigation.navigate("ReviewGame", {
      language,
      wordList,
    });
  }
  const titleForButton =
    wordList.length !== 1
      ? `${wordList.length} words`
      : `${wordList.length} word`;
  return (
    <View style={[styles.card, languageBackground]}>
      <Text style={styles.langText}>{language}</Text>
      <Button
        title={titleForButton}
        disabled={wordList.length === 0}
        onPress={navigateToLanguage}
      ></Button>
    </View>
  );
}

const Review = () => {
  return (
    <ScrollView>
      <View>
        {wordsToReviewFormatted.map((data) => {
          return (
            <ReviewCard
              language={data[0]}
              wordList={data[1]}
              key={data[0]}
            ></ReviewCard>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "grey",
    marginBlockEnd: 10,
    flex: 1,
  },
  card: {
    width: Dimensions.get("screen").width,
    height: "auto",
    marginBlockEnd: 10,
    alignItems: "center",
    paddingBlock: 10,
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
    marginBlock: 10,
    textAlign: "center",
    borderRadius: 10,
  },
});

export default Review;

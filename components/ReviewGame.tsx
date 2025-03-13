import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";

const ReviewGame = ({ route }: any) => {
  const navigation = useNavigation<StackNavigationProp<{ Review?: any }>>();
  const { language, reviewableWordsList, userID } = route.params;
  const [currWordList, setCurrWordList] = useState(reviewableWordsList);
  const [currTextInput, setCurrTextInput] = useState("");
  type Log = any[];
  const [logAnswers, setLogAnswers] = useState<Log>([]);
  const [isFinished, setIsFinished] = useState(false);
  const currWordInEnglish = currWordList[0]["english"];
  const currWord = currWordList[0][language];
  const currLanguageMastery = currWordList[0][language + "_mastery"];
  const reviewAxiosInstance = axios.create({
    baseURL: "https://wordslingerserver.onrender.com/api/reviews/",
  });
  function submitAnswer() {
    if (
      currTextInput.toLocaleLowerCase() ===
      currWordInEnglish.toLocaleLowerCase()
    ) {
      switch (currLanguageMastery) {
        case "beginner":
          reviewAxiosInstance({
            method: "patch",
            url: `${userID}`,
            data: {
              english: currWordInEnglish,
              target_language: language,
              new_mastery: "intermediate",
            },
          });
          break;
        case "intermediate":
          reviewAxiosInstance({
            method: "patch",
            url: `${userID}`,
            data: {
              english: currWordInEnglish,
              target_language: language,
              new_mastery: "master",
            },
          });
          break;
        case "master":
          reviewAxiosInstance({
            method: "patch",
            url: `${userID}`,
            data: {
              english: currWordInEnglish,
              target_language: language,
              new_mastery: "master",
            },
          });
      }
      setLogAnswers((currValue) => {
        return [...currValue, [currWordInEnglish, "RIGHT"]];
      });
      if (currWordList.length !== 1) {
        setCurrWordList(() => {
          return currWordList.slice(1);
        });
      } else {
        setIsFinished(true);
      }

      setCurrTextInput("");
    } else {
      switch (currLanguageMastery) {
        case "beginner":
          reviewAxiosInstance({
            method: "patch",
            url: `${userID}`,
            data: {
              english: currWordInEnglish,
              target_language: language,
              new_mastery: "beginner",
            },
          });
          break;
        case "intermediate":
          reviewAxiosInstance({
            method: "patch",
            url: `${userID}`,
            data: {
              english: currWordInEnglish,
              target_language: language,
              new_mastery: "beginner",
            },
          });
          break;
        case "master":
          reviewAxiosInstance({
            method: "patch",
            url: `${userID}`,
            data: {
              english: currWordInEnglish,
              target_language: language,
              new_mastery: "intermediate",
            },
          });
      }
      setLogAnswers((currValue) => {
        return [...currValue, [currWordInEnglish, "WRONG"]];
      });

      if (currWordList.length !== 1) {
        setCurrWordList(() => {
          return currWordList.slice(1);
        });
      } else {
        setIsFinished(true);
      }
      setCurrTextInput("");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {isFinished ? (
        <Button
          title="Return To Review"
          onPress={() => {
            navigation.navigate("Review");
          }}
        ></Button>
      ) : (
        <View style={styles.card}>
          <Text style={styles.langText}>{currWord}</Text>
          <TextInput
            placeholder="Enter the word above in English!"
            style={{
              width: "100%",
              textAlign: "center",
              marginBlock: 10,
              backgroundColor: "white",
              paddingBlock: 10,
            }}
            onChange={(e: any) => {
              setCurrTextInput(() => {
                console.log(e, "<<<<");

                return e.target.value;
              });
            }}
            onKeyPress={(e: any) => {
              e.key === "Enter" ? submitAnswer() : null;
            }}
            value={currTextInput}
          ></TextInput>
          <Button onPress={submitAnswer} title="Submit"></Button>
        </View>
      )}
      <Text>Shooting animation below to correspond with answer: </Text>
      {logAnswers.map(([answer, rightOrWrong]: [string, "RIGHT" | "WRONG"]) => {
        const answerStyle: any = styles[`${rightOrWrong}`];

        return (
          <Text key={answer} style={answerStyle}>
            You got the answer {answer} {rightOrWrong}!
          </Text>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBlockEnd: 10,
    flex: 1,
    backgroundColor: "#d4df9e",
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
    backgroundColor: "pink",
  },

  langText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBlock: 10,
    textAlign: "center",
    borderRadius: 10,
  },
  RIGHT: {
    backgroundColor: "green",
    width: "100%",
    maxWidth: 1000,
    textAlign: "center",
    marginBlock: 5,
  },
  WRONG: {
    backgroundColor: "#aa151b",
    width: "100%",
    maxWidth: 1000,
    textAlign: "center",
    marginBlock: 5,
  },
});

export default ReviewGame;

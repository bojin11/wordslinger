import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
const townBG = require("../assets/wild-west-town.png");
const ReviewGame = ({ route }: any) => {
  const navigation = useNavigation<StackNavigationProp<{ Review?: any }>>();
  const { language, reviewableWordsList, userID } = route.params;
  const [currWordList, setCurrWordList] = useState(reviewableWordsList);
  const [currTextInput, setCurrTextInput] = useState("");
  const [logAnswers, setLogAnswers] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const currWordInEnglish = currWordList[0]["english"];
  const currWord = currWordList[0][language];
  const currLanguageMastery = currWordList[0][language + "_mastery"];
  const currWordImg = currWordList[0].image_url;

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
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={{
          alignItems: "center",
          marginBlockStart: "5%",
          justifyContent: "center",
          gap: "2%",
        }}
      >
        {isFinished ? (
          <Button
            title="Return To Review"
            onPress={() => {
              navigation.navigate("Review");
            }}
          ></Button>
        ) : (
          <>
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
            <Image
              source={currWordImg}
              style={[styles.image, { resizeMode: "center" }]}
            ></Image>
          </>
        )}

        {logAnswers.map(
          ([answer, rightOrWrong]: [string, "RIGHT" | "WRONG"]) => {
            const answerStyle: any = styles[`${rightOrWrong}`];

            return (
              <Text key={answer} style={answerStyle}>
                You got the answer {answer} {rightOrWrong}!
              </Text>
            );
          }
        )}
      </ScrollView>
      <ImageBackground
        style={[styles.fixed, styles.container, { zIndex: -1 }]}
        source={townBG}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen,
    flex: 1,
    marginInline: "auto",
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
    backgroundColor: "#ac4c1c",
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollview: {
    backgroundColor: "transparent",
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
    width: Dimensions.get("screen").width,
    textAlign: "center",
    marginBlock: 5,
  },
  WRONG: {
    backgroundColor: "#aa151b",
    width: Dimensions.get("screen").width,
    textAlign: "center",
    marginBlock: 5,
  },
  image: {
    backgroundColor: "#ec965d",
    borderColor: "black",
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 50 / 2,
    overflow: "hidden",
    padding: 10,
  },
});

export default ReviewGame;

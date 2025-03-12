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

const ReviewGame = ({ route }: any) => {
  const navigation = useNavigation<StackNavigationProp<{ Review?: any }>>();
  const { language, wordList } = route.params;
  const [currWordList, setCurrWordList] = useState(wordList);
  const [currTextInput, setCurrTextInput] = useState("");
  type Log = any[];
  const [logAnswers, setLogAnswers] = useState<Log>([]);
  const [isFinished, setIsFinished] = useState(false);
  const currWordInEnglish = currWordList[0][1];
  const currWord = currWordList[0][0];
  function submitAnswer() {
    if (
      currTextInput.toLocaleLowerCase() ===
      currWordInEnglish.toLocaleLowerCase()
    ) {
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
            onChange={(e) => {
              setCurrTextInput(() => {
                return e.target.value;
              });
            }}
            onKeyPress={(e) => {
              e.key === "Enter" ? submitAnswer() : null;
            }}
            value={currTextInput}
          ></TextInput>
          <Button onPress={submitAnswer} title="Submit"></Button>
        </View>
      )}
      <Text>Shooting animation below to correspond with answer: </Text>
      {logAnswers.map(([answer, rightOrWrong]) => {
        const answerStyle = styles[`${rightOrWrong}`];

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

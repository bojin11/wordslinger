import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
//import { TestLearnWords } from "../types/LearnModeTypes";
import frenchTestWordsLv1 from "../_testdata/wordsFrenchLv1";

interface LearnWords {
  english: string;
  french?: string;
  german?: string;
  spanish?: string;
  word_level: number;
  image_url: string;
}

const newWords: LearnWords[] = frenchTestWordsLv1;

console.log(newWords);

const backgroundUI = {
  backgroundTabel: require("../assets/learn/dealers-table.png"),
  cardOutline: require("../assets/learn/card-outline-black.png"),
  cardOutlineWhite: require("../assets/learn/card-outline-white.svg"),
  cardFront: require("../assets/learn/card-front.svg"),
  cardBack: require("../assets/learn/card-back.svg"),
};

const handleReview = () => {};

console.log(frenchTestWordsLv1[3].image_url);

const Learn: React.FunctionComponent = () => {
  return (
    <>
      <View style={styles.learnContainer}>
        <ImageBackground
          style={styles.bgUI}
          source={backgroundUI.backgroundTabel}
        >
          <View style={styles.dealerCards}>
            {newWords.map((word, index) => {
              return (
                <View>
                  <Image
                    style={styles.cardBlank}
                    source={backgroundUI.cardFront}
                  />
                  <Text style={styles.text}>
                    {word.french
                      ? word.french
                      : word.spanish
                      ? word.spanish
                      : word.german}
                  </Text>
                  <Image
                    style={styles.wordImage}
                    source={{ uri: word.image_url }}
                  />
                </View>
              );
            })}
          </View>

          <View style={styles.cardsDisplayContainer}>
            <Image
              style={styles.cardOutlineBlack}
              source={backgroundUI.cardOutline}
            />
            <Image
              style={styles.cardOutlineBlack}
              source={backgroundUI.cardOutline}
            />
            <Image
              style={styles.cardOutlineBlack}
              source={backgroundUI.cardOutline}
            />
            <Image
              style={styles.cardOutlineBlack}
              source={backgroundUI.cardOutline}
            />
            <Image
              style={styles.cardOutlineBlack}
              source={backgroundUI.cardOutline}
            />
          </View>
          <View style={styles.selectedCardView}>
            <Image style={styles.cardBlank} source={backgroundUI.cardFront} />
            <Text style={styles.textSmallOverlay}>
              {newWords[3].french
                ? newWords[3].french
                : newWords[3].spanish
                ? newWords[3].spanish
                : newWords[3].german}
            </Text>
            <Image
              style={styles.wordImage}
              source={{ uri: newWords[3].image_url }}
            />
            <Image style={styles.cardBlank} source={backgroundUI.cardFront} />
            <Text style={styles.textLargeOverlay}>{newWords[0].english}</Text>
            <Image
              style={styles.wordImage}
              source={{ uri: newWords[3].image_url }}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleReview}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>review</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </>
  );
};
export default Learn;
const styles = StyleSheet.create({
  learnContainer: {
    flex: 1,
  },
  cardsDisplayContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",

    margin: 10,
    padding: "3%",
  },

  bgUI: {
    height: "100%",
    width: "100%",
  },

  dealerCards: {
    flex: 1,
    flexDirection: "row",
    position: "static",
    left: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "space-evenly",
    padding: "3.5%",
    zIndex: 1,
    borderTopWidth: 2,
  },
  cardOutlineBlack: {
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: 3,
  },

  selectedCardView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    height: "50%",
    bottom: 0,
    margin: 10,
    padding: "3%",
    left: 0,
    zIndex: 0,
  },

  cardBlank: {
    height: "100%",
    width: "100%",
  },

  wordImage: {
    flex: 1,
    maxWidth: "100%",
    maxHeight: 150,
    zIndex: 3,
    resizeMode: "contain",
  },

  buttonContainer: {
    margin: "2%",
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "flex-end",
  },
  button: {
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#878787",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#bfbfbf",
    width: "25%",
  },
  buttonText: {
    backgroundColor: "#878787",
    maxHeight: 80,
    color: "white",
    padding: 2,
    borderRadius: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  textLargeOverlay: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 2,
  },
  textSmallOverlay: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 2,
  },
});

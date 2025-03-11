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
import { _ } from "@faker-js/faker/dist/airline-CBNP41sR";

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
      <ImageBackground
        style={{ flex: 1, height: "100%", width: "100%" }}
        source={backgroundUI.backgroundTabel}
      >
        <View style={styles.cardsDisplayContainer}>
          <View style={styles.cardOutlineContainerSmall}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={styles.cardWrapper}>
                <Image
                  key={index}
                  style={styles.cardOutlineStyle}
                  source={backgroundUI.cardOutline}
                />
              </View>
            ))}
          </View>
          <View>
            <View style={styles.wordContainer}>
              {newWords.map((word, index) => {
                return (
                  <View style={styles.imageWrapper}>
                    <Image
                      style={styles.smallCards}
                      source={backgroundUI.cardFront}
                    />
                    <Text style={styles.textSmallOverlay}>
                      {word.french
                        ? word.french
                        : word.spanish
                        ? word.spanish
                        : word.german}
                    </Text>
                    <Image
                      style={{
                        maxHeight: "100%",
                        maxWidth: 150,
                        resizeMode: "contain",
                        zIndex: 2,
                      }}
                      source={{ uri: word.image_url }}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={styles.cardsDisplayContainer}>
          <View style={styles.cardOutlineContainerLarge}>
            {Array.from({ length: 2 }).map((_, index) => (
              <View key={index} style={styles.cardWrapper}>
                <Image
                  key={index}
                  style={styles.cardOutlineStyleLarge}
                  source={backgroundUI.cardOutlineWhite}
                />
              </View>
            ))}
          </View>
          <View style={styles.wordContainer}>
            <View style={styles.imageWrapper}>
              <Image
                style={{ height: "10%", width: "10%" }}
                source={backgroundUI.cardFront}
              />
              <Text style={styles.textLargeOverlay}>
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
            </View>

            {/* <Image style={styles.cardBlank} source={backgroundUI.cardFront} />
            <Text style={styles.textLargeOverlay}>{newWords[3].english}</Text>
            <Image
              style={styles.wordImage}
              source={{ uri: newWords[3].image_url }}
            /> */}
          </View>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleReview}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>review</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};
export default Learn;
const styles = StyleSheet.create({
  learnContainer: {},
  cardsDisplayContainer: {
    display: "flex",
    padding: "2.5%",
    flexDirection: "row",
    top: 0,
    margin: 2,
    height: "20%",
  },
  cardOutlineContainerSmall: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    marginBottom: 10,
  },
  cardOutlineStyle: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cardOutlineStyleLarge: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  cardOutlineContainerLarge: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 200,
    marginBottom: 10,
    backgroundColor: "grey",
  },

  smallCards: {
    position: "absolute",
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    zIndex: 1,
  },

  cardsDisplay: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dealerCards: {},
  cardOutlineBlack: {},

  wordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  cardBlank: { height: 100, width: 100, resizeMode: "contain", zIndex: 1 },

  wordImage: {
    flex: 1,
    maxWidth: "100%",
    maxHeight: 150,
    zIndex: 3,
    resizeMode: "contain",
  },
  cardWrapper: {
    position: "relative",
  },
  imageWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
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
    top: "40%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 2,
  },
});

import React, { useState } from "react";
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
import { _, F } from "@faker-js/faker/dist/airline-CBNP41sR";
import { CardAnimationContext } from "@react-navigation/stack";
import { fakerES } from "@faker-js/faker/.";

const backgroundUI = {
  backgroundTabel: require("../assets/learn/dealers-table.png"),
  cardOutline: require("../assets/learn/card-outline-black.png"),
  cardOutlineWhite: require("../assets/learn/card-outline-white.svg"),
  cardFront: require("../assets/learn/card-front.svg"),
  cardBack: require("../assets/learn/card-back.svg"),
};
const testImages = {
  baby: require("../assets/learn/baby.png"),
};
interface LearnWords {
  english: string;
  french?: string;
  german?: string;
  spanish?: string;
  word_level: number;
  image_url: string;
}

const handleReview = () => {};

const Learn: React.FunctionComponent = () => {
  const [faceDownCards, setFaceDownCards] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const newWords: LearnWords[] = frenchTestWordsLv1;

  const arrary = [false, false, false, false, false];

  const handleFlip = (index: number) => {
    console.log(`card ${index} pressed`);
    let flipCard = [...faceDownCards];
    flipCard[index] = true;
    setFaceDownCards(flipCard);
  };

  return (
    <>
      <ImageBackground
        style={{ flex: 1, height: "100%", width: "100%" }}
        source={backgroundUI.backgroundTabel}
      >
        <View style={styles.displayContainer}>
          <View style={styles.outlineContainerSmall}>
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
                  <View style={{ flexDirection: "column" }}>
                    {faceDownCards[index] ? (
                      <View style={styles.cardWrapper}>
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
                    ) : (
                      <View style={styles.cardWrapper}>
                        <TouchableOpacity onPress={() => handleFlip(index)}>
                          <Image
                            style={styles.smallCardBack}
                            source={backgroundUI.cardBack}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={styles.inspectContainer}>
          <View style={styles.cardContainerLarge}>
            <View style={styles.cardWrapper}>
              <Image
                key={0}
                style={styles.largeCard}
                source={backgroundUI.cardOutlineWhite}
              />
              <Image
                key={1}
                style={styles.largeCard}
                source={backgroundUI.cardOutlineWhite}
              />
            </View>
          </View>
          <View style={styles.cardContainerLarge}>
            <View style={styles.cardWrapper}>
              <Image style={styles.largeCard} source={backgroundUI.cardFront} />
              <Text style={styles.textLargeOverlay}>
                {newWords[3].french
                  ? newWords[3].french
                  : newWords[3].spanish
                  ? newWords[3].spanish
                  : newWords[3].german}
              </Text>
              <Image style={styles.wordImage} source={testImages.baby} />
            </View>
            <View style={styles.cardWrapper}>
              <Image style={styles.largeCard} source={backgroundUI.cardFront} />
              <Text style={styles.textLargeOverlay}>{newWords[3].english}</Text>
            </View>
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
  displayContainer: {
    padding: "2.5%",
    flex: 1,
    top: 0,
    margin: 2,
    height: "20%",
  },
  inspectContainer: {
    flex: 2,
    padding: "2.5%",
    top: 0,
    margin: 2,
    height: "20%",
  },
  outlineContainerSmall: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    marginBottom: 10,
  },
  cardOutlineStyle: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    zIndex: 1,
  },

  cardContainerLarge: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 200,
    marginBottom: 10,
  },

  largeCard: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  smallCards: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    zIndex: 2,
  },
  smallCardBack: {
    height: 125,
    width: 125,
    resizeMode: "contain",
    zIndex: 2,
  },

  cardsDisplay: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  dealerCards: {},
  cardOutlineBlack: {},

  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    height: 200,
    marginBottom: 10,
  },

  cardBlank: { height: 100, width: 100, resizeMode: "contain", zIndex: 1 },

  wordImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    zIndex: 5,
  },
  cardWrapper: {
    position: "relative",
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
    top: "65%",
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
    zIndex: 2,
  },
  textSmallOverlay: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 2,
  },
});

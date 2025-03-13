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
import useFetchData from "../customHooks/useFetchData";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { CurrentRenderContext, useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";

const backgroundUI = {
  backgroundTabel: require("../assets/learn/dealers-table.png"),
  cardOutline: require("../assets/learn/card-outline-black.png"),
  cardOutlineWhite: require("../assets/learn/card-outline-white.png"),
  cardFront: require("../assets/learn/card-front001.png"),
  cardBack: require("../assets/learn/card-back.png"),
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

export default function Learn({ navigation, route }: React.FunctionComponent) {
  // const async {
  //   data: words,
  //   error,
  //   isPending,
  // } = useFetchData(
  //   "https://wordslingerserver.onrender.com/api/word-list/french"
  // );

  const navigateTo = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook

  const [faceDownCards, setFaceDownCards] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  //const wordsToLearn: LearnWords[] = words;
  const [isDisplaying, setIsDisplaying] = useState(Number);
  const wordsToLearn: LearnWords[] = frenchTestWordsLv1;

  //const dogEatsBaby: string = wordsToLearn[isDisplaying].image_url;
  const dogEatsBaby: string = "https://imgur.com/du8Ctb2";

  const [isZero, setIsZero] = useState(wordsToLearn.length);
  const handleShowCard = (index: number) => {
    setIsDisplaying(index);
  };

  const handleFlip = (index: number) => {
    console.log(index);
    let flipCard = [...faceDownCards];
    flipCard[index] = true;
    setFaceDownCards(flipCard);
    setIsZero(isZero - 1);
    handleShowCard(index);
  };
  return (
    <>
      <ImageBackground
        style={{
          flex: 1,
          height: "120 %",
          width: "100%",
        }}
        source={backgroundUI.backgroundTabel}
      >
        {/* {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>} */}
        <View style={styles.displayContainer}>
          <View style={styles.outlineContainerSmall}>
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <ImageBackground
                key={index}
                style={styles.cardOutlineStyle}
                source={backgroundUI.cardOutline}
              />
            ))} */}
          </View>
        </View>
        <View style={styles.displayContainer}>
          <View style={styles.cardContainerSmall}>
            {wordsToLearn.map((word, index) => {
              return (
                <View key={index}>
                  {faceDownCards[index] ? (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          handleShowCard(index);
                        }}
                      >
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
                          style={styles.wordImageSmall}
                          source={word.image_url}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
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
        <View style={styles.inspectContainer}>
          <View style={styles.outlineContainerLarge}>
            <Image style={styles.largeCard} source={backgroundUI.cardFront} />
            <Image
              style={styles.wordImage}
              source={wordsToLearn[isDisplaying].image_url}
            />
            <Text style={styles.textLargeOverlay}>
              {wordsToLearn[isDisplaying].french
                ? wordsToLearn[isDisplaying].french
                : wordsToLearn[isDisplaying].spanish
                ? wordsToLearn[isDisplaying].spanish
                : wordsToLearn[isDisplaying].german}
            </Text>

            <Image style={styles.largeCard} source={backgroundUI.cardFront} />
            <Image
              style={styles.wordImage}
              source={wordsToLearn[isDisplaying].image_url}
            />
            <Text style={styles.textLargeOverlay}>
              {wordsToLearn[isDisplaying].english}
            </Text>
          </View>
        </View>

        <View>
          {isZero === 0 ? (
            <TouchableOpacity
              style={globalStyles.buttonContainer}
              onPress={() => {
                navigatorTo.navigate("Practice");
              }}
            >
              <View style={globalStyles.buttonActive}>
                <Text style={globalStyles.buttonActiveText}>review</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={globalStyles.buttonContainer}>
              <View style={globalStyles.buttonInactive}>
                <Text style={globalStyles.buttonInactiveText}>review</Text>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    top: "12%",
    height: "20%",
    width: "20%",
    alignSelf: "center",
  },
  outlineContainerSmall: {
    margin: "1%",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: "1%",
    minWidth: "80%",
    flexWrap: "wrap",
    height: "70%",
    resizeMode: "contain",
  },

  cardContainerSmall: {
    margin: "1%",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: "1%",
    minWidth: "80%",
    flexWrap: "wrap",
    height: "70%",
    resizeMode: "contain",
    top: "50%",
  },

  cardOutlineStyle: {
    flex: 1,
    flexWrap: "wrap",
    width: "90%",
    height: "100%",
    resizeMode: "contain",
    position: "relative",
    alignSelf: "center",
  },

  smallCardBack: {
    top: "5%",
    minWidth: "19%",
    height: "100%",
    resizeMode: "contain",
    position: "relative",
    alignSelf: "center",
  },
  smallCards: {
    top: "-5%",
    margin: "0.5%",
    position: "relative",
    resizeMode: "contain",
    minWidth: "19%",
    height: "100%",
    zIndex: 2,
    alignSelf: "center",
  },

  cardFlipConatiner: {
    flexDirection: "row",
    position: "relative",
    width: "10%",
    height: "100%",
  },

  wordImageSmall: {
    maxWidth: "100%",
    resizeMode: "contain",
    zIndex: 5,
  },
  textSmallOverlay: {
    position: "absolute",
    top: "65%",
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 2,
  },
  inspectContainer: {
    flex: 1,
    padding: "4%",
    top: 0,
    width: "100%",
  },
  outlineContainerLarge: {
    position: "absolute",
    flexDirection: "row",
    marginBottom: "20%",
    width: "55%",
    height: "120%",
  },
  cardContainerLarge: {},
  largeCard: {
    margin: "2%",
    padding: "3%",
    position: "relative",
    width: "60%",
    height: "60%",
    zIndex: 2,
  },
  largeDisplayCard: {
    minWidth: "38%",
    height: "95%",

    right: "0%",
  },
  textLargeOverlay: {
    position: "relative",
    top: "42%",
    right: "83%",
    bottom: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
    zIndex: 3,
  },
  wordImage: {
    width: "30%",
    height: "30%",
    alignSelf: "center",
    resizeMode: "contain",
    bottom: "22%",
    right: "45%",
    zIndex: 5,
  },
});

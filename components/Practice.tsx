import React, { useState, useEffect, useRef } from "react";
import { globalStyles } from "../styles/globalStyles";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Button,
} from "react-native";
import * as Progress from "react-native-progress";
import { Language } from "../types/Leaderboard";
import SelectLanguageMultiplayer from "./LanguageSelectorMultiplayer";
import { SafeAreaView } from "react-native-safe-area-context";

interface WordPair {
  english: string;
  nonEnglish: string;
}

const Practice = () => {
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null); // current word to type
  const [inputValue, setInputValue] = useState<string>(""); // user input
  const [score, setScore] = useState<number>(0); // score tracking
  const [timer, setTimer] = useState<number>(30); // countdown timer
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language | null>(null);
  const [languageNotSelected, setLanguageNotSelected] = useState<boolean>(true);
  const [wordPairs, setWordPairs] = useState<WordPair[]>([]); // Word list (English/Non-English pairs) from API

  const UiImages = {
    background: require("../assets/wild-west-town.png"),
  };
  const playerIcons = {
    gunLeft: require("../assets/fps-gun-leftCU.png"),
    gunRight: require("../assets/fps-gun-rightCU.png"),
    signPost: require("../assets/Pannel1.png"),
  };

  const rotation = useRef(new Animated.Value(0)).current;

  // Fetch words from the server when the language is selected
  const fetchWords = async (language: string) => {
    language = language.toLowerCase();
    try {
      const response = await axios.get(
        `https://wordslingerserver.onrender.com/api/word-list/${language}`
      );
      const englishTranslations = response.data.words.map(
        (word: Word) => word.english
      );
      const nonEnglishTranslations = response.data.words.map((word: Word) => {
        return language === "german"
          ? word.german
          : language === "french"
          ? word.french
          : word.spanish;
      });

      // Create word pairs
      const pairs = englishTranslations.map(
        (englishWord: string, index: number) => ({
          english: englishWord,
          nonEnglish: nonEnglishTranslations[index],
        })
      );

      setWordPairs(pairs);
      setCurrentWord(pairs[Math.floor(Math.random() * pairs.length)]); // Set the first random word pair
    } catch (error) {
      console.error("Error fetching word list:", error);
    }
  };

  // UseEffect to detect language change and fetch word list
  useEffect(() => {
    if (language && !languageNotSelected) {
      fetchWords(language); // Fetch words when language is selected
    }
  }, [language]);

  useEffect(() => {
    // Countdown timer logic
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      // End game if timer runs out
      setIsGameOver(true);
    }
  }, [timer, isGameOver]);

  const handleInputChange = (text: string) => {
    setInputValue(text);

    if (
      currentWord &&
      text.toLowerCase() === currentWord.english.toLowerCase()
    ) {
      // Correct non-English word typed
      setScore((prev) => prev + 1);
      setInputValue("");

      // Set a new random word pair
      const newWord = wordPairs[Math.floor(Math.random() * wordPairs.length)];
      setCurrentWord(newWord);

      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1, // Rotate by -15 degrees
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0, // Rotate back to 0 degrees
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleRestartGame = () => {
    setScore(0);
    setTimer(30);
    setIsGameOver(false);
    setInputValue("");

    // Reset currentWord to a new word from the list
    if (wordPairs.length > 0) {
      setCurrentWord(wordPairs[Math.floor(Math.random() * wordPairs.length)]);
    }
  };

  const handleStartGame = () => {
    if (!languageNotSelected) {
      setIsReady(true); // Set the player as ready only if language is selected
    }
  };

  const rotateLeft = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-15deg"],
  });
  const rotateLeftStyle = { transform: [{ rotate: rotateLeft }] };

  const rotateRight = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "15deg"],
  });
  const rotateRightStyle = { transform: [{ rotate: rotateRight }] };

  return (
    <ImageBackground
      style={{ flex: 1, height: "100%", width: "100%" }}
      source={UiImages.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Show language selection and start game button if not ready */}

        {!isReady ? (
          <View>
            <ImageBackground
              style={globalStyles.upperSignTextBox}
              source={playerIcons.signPost}
            ></ImageBackground>
            <View style={globalStyles.signPostTextBox}>
              <Text style={globalStyles.signPostTitle}>Target Pratice</Text>
              <View style={{ top: "70%" }}>
                <SelectLanguageMultiplayer
                  language={language}
                  setLanguage={setLanguage}
                  setLanguageNotSelected={setLanguageNotSelected}
                />

                <Button
                  title="Start Game"
                  onPress={handleStartGame}
                  disabled={languageNotSelected}
                />
              </View>
            </View>
          </View>
        ) : (
          <>
            {/* Show game UI if ready */}
            {isGameOver ? (
              <View style={styles.gameOverContainer}>
                <Text style={styles.gameOverText}>Game Over!</Text>
                <Text style={styles.finalScore}>Your Score: {score}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRestartGame}
                >
                  <Text style={styles.buttonText}>Restart Game</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.gameContainer}>
                <Text style={styles.subtitle}>
                  Type the English translation of the following word:
                </Text>
                {currentWord && (
                  <Text style={styles.word}>{currentWord.nonEnglish}</Text>
                )}
                <TextInput
                  style={styles.input}
                  value={inputValue}
                  onChangeText={handleInputChange}
                  placeholder="Type the translation here"
                  placeholderTextColor="#888"
                />
                <Text style={styles.timer}>
                  Time: {timer} seconds remaining
                </Text>
                <Progress.Bar
                  progress={timer / 30} // Normalize progress from 0 to 1 based on initial time
                  width={300}
                  color="#4CAF50"
                  height={12}
                  borderRadius={6}
                  animated={true}
                  style={styles.progressBar}
                />
              </View>
            )}
            <View style={{ height: "40%", width: "100%" }}>
              <Animated.Image
                style={[globalStyles.leftGun, rotateLeftStyle]}
                source={playerIcons.gunLeft}
              />
              <Animated.Image
                style={[globalStyles.rightGun, rotateRightStyle]}
                source={playerIcons.gunRight}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Practice;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: 100,
    width: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  text: {
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  word: {
    fontSize: 32,
    fontWeight: "600",
    color: "#ff5722",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  timer: {
    fontSize: 20,
    color: "#ff0000",
    marginBottom: 20,
  },
  gameOverContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff5722",
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 24,
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  progressBar: {
    marginBottom: 20,
  },

  gameContainer: {
    backgroundColor: "rgba(128, 128, 128, 0.5)",
  },
});

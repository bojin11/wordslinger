import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import * as Progress from "react-native-progress";

// List of words for the typing game
const words = [
  "apple",
  "banana",
  "grape",
  "orange",
  "mango",
  "peach",
  "pear",
  "plum",
];

const Practice = () => {
  const [currentWord, setCurrentWord] = useState<string>(""); // word to type
  const [inputValue, setInputValue] = useState<string>(""); // user input
  const [score, setScore] = useState<number>(0); // score tracking
  const [timer, setTimer] = useState<number>(30); // countdown timer
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false); // for emoji display
  const UiImages = {
    background: require("../assets/wild-west-town.png"),
  };
  useEffect(() => {
    // Initialize the game with a random word
    setRandomWord();
  }, []);

  useEffect(() => {
    // Countdown timer logic
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      // End game if timer runs out
      setIsGameOver(true);
    }
  }, [timer, isGameOver]);

  const setRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (text.toLowerCase() === currentWord.toLowerCase()) {
      // Correct word typed
      setScore(score + 1);
      setInputValue("");
      setRandomWord(); // Set new word
      showCelebrationEmoji(); // Trigger emoji display
    }
  };

  const showCelebrationEmoji = () => {
    setShowCelebration(true); // Show emoji
    setTimeout(() => {
      setShowCelebration(false); // Hide emoji after 1 second
    }, 1000);
  };

  const handleRestartGame = () => {
    setScore(0);
    setTimer(30);
    setIsGameOver(false);
    setRandomWord();
    setInputValue("");
  };

  return (
    <ImageBackground
      style={{ flex: 1, height: "100%", width: "100%" }}
      source={UiImages.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Typing Game</Text>
        {isGameOver ? (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Text style={styles.finalScore}>Your Score: {score}</Text>
            <TouchableOpacity style={styles.button} onPress={handleRestartGame}>
              <Text style={styles.buttonText}>Restart Game</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.subtitle}>
              Game Instruction: Type the correct words below
            </Text>
            <Text style={styles.word}>{currentWord}</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={handleInputChange}
              placeholder="Type the word here"
              placeholderTextColor="#888"
            />
            <Text style={styles.timer}>Time: {timer} seconds remaining</Text>
            <Progress.Bar
              progress={timer / 30} // Normalize progress from 0 to 1 based on initial time
              width={300}
              color="#4CAF50"
              height={12}
              borderRadius={6}
              animated={true}
              style={styles.progressBar}
            />
            <Text style={styles.score}>Score: {score}</Text>
            {showCelebration && (
              <Text style={styles.celebrationEmoji}>🎉</Text> // Celebration emoji display
            )}
          </View>
        )}
      </View>
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
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
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
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
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
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  progressBar: {
    marginBottom: 20,
  },
  celebrationEmoji: {
    fontSize: 40,
    marginTop: 15,
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

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

const Learn = () => {
  const [currentWord, setCurrentWord] = useState<string>(""); // word to type
  const [inputValue, setInputValue] = useState<string>(""); // user input
  const [score, setScore] = useState<number>(0); // score tracking
  const [timer, setTimer] = useState<number>(30); // countdown timer
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

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
    }
  };

  const handleRestartGame = () => {
    setScore(0);
    setTimer(30);
    setIsGameOver(false);
    setRandomWord();
    setInputValue("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Typing Game</Text>
      {isGameOver ? (
        <View>
          <Text style={styles.gameOverText}>
            Game Over! Your Score: {score}
          </Text>
          <Button title="Restart Game" onPress={handleRestartGame} />
        </View>
      ) : (
        <View>
          <Text style={styles.word}>{currentWord}</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Type the word here"
          />
          <Text style={styles.timer}>Time: {timer}s</Text>
          <Text style={styles.score}>Score: {score}</Text>
        </View>
      )}
    </View>
  );
};

export default Learn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  word: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 20,
  },
  timer: {
    fontSize: 24,
    color: "#ff0000",
  },
  score: {
    fontSize: 24,
    marginTop: 10,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

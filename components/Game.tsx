import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import io, { Socket } from "socket.io-client";

// Socket.IO connection (replace with your backend URL)
const socket: Socket = io("http://localhost:3000");

const Game = () => {
  const [currentWord, setCurrentWord] = useState<string>(""); // Word to type
  const [inputValue, setInputValue] = useState<string>(""); // User input
  const [score, setScore] = useState<number>(0); // Local player score
  const [opponentScore, setOpponentScore] = useState<number>(0); // Opponent score
  const [currentTurn, setCurrentTurn] = useState<string>(""); // ID of the player whose turn it is
  const [myId, setMyId] = useState<string>(""); // ID of the current client
  const [myName, setMyName] = useState<string>(""); // Name of the current player

  useEffect(() => {
    // Set the player's ID once connected
    socket.on("connect", () => {
      setMyId(socket.id);
    });

    // Listen for game start
    socket.on(
      "startGame",
      (data: { currentWord: string; currentTurn: string; players: any }) => {
        setCurrentWord(data.currentWord);
        setCurrentTurn(data.currentTurn);
        setMyName(data.players[socket.id].name); // Set player name
      }
    );

    // Listen for game state updates
    socket.on(
      "updateGameState",
      (data: { currentWord: string; currentTurn: string; players: any }) => {
        setCurrentWord(data.currentWord);
        setCurrentTurn(data.currentTurn);
        setScore(data.players[myId]?.score || 0);
        const opponentId = Object.keys(data.players).find((id) => id !== myId);
        setOpponentScore(data.players[opponentId]?.score || 0);
      }
    );

    // Listen for game over
    socket.on("gameOver", (data: { players: any }) => {
      alert("Game over!");
    });

    return () => {
      socket.off("connect");
      socket.off("startGame");
      socket.off("updateGameState");
      socket.off("gameOver");
    };
  }, [myId]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (
      text.toLowerCase() === currentWord.toLowerCase() &&
      currentTurn === myId
    ) {
      // Correct word typed, emit event to server
      socket.emit("wordTyped", { word: text });
      setInputValue(""); // Clear input field
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Typing Game</Text>
      <Text style={styles.word}>{currentWord}</Text>
      <Text>{currentTurn === myId ? "Your Turn" : "Opponent's Turn"}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Type the word here"
        editable={currentTurn === myId} // Disable input if it's not your turn
      />
      <Text style={styles.score}>Your Score: {score}</Text>
      <Text style={styles.score}>Opponent's Score: {opponentScore}</Text>
    </View>
  );
};

export default Game;

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
  score: {
    fontSize: 24,
    marginTop: 10,
  },
});

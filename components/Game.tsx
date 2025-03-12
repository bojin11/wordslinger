import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  FlatList,
  Animated,
  ImageBackground,
} from "react-native";
import { useAuth } from "./contexts/username";
import io from "socket.io-client";
import * as Progress from "react-native-progress";
import { Language } from "../types/Leaderboard";
import SelectLanguageMultiplayer from "./LanguageSelectorMultiplayer";
const socket = io("http://localhost:3000"); // Replace with your server URL

const Game = () => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [finishGame, setFinishGame] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  let [timer, setTimer] = useState<number>(30);
  const [roomId, setRoomId] = useState<string>("");
  const [players, setPlayers] = useState<{ [key: string]: any }>({});
  const [language, setLanguage] = useState<Language | null>(null);
  const [languageNotSelected, setLanguageNotSelected] = useState<Boolean>(true);
  const UiImages = {
    background: require("../assets/wild-west-town.png"),
  };
  const playerIcons = {
    gunLeft: require("../assets/fps-gun-leftCU.png"),
    gunRight: require("../assets/fps-gun-rightCU.png"),
  };

  const rotation = useRef(new Animated.Value(0)).current;

  const { user } = useAuth();

  interface Player {
    correctAnswers: Array<string>;
    currentWordIndex: number;
    ready: boolean; // Add ready state to track whether player is ready
  }

  interface Players {
    [socketId: string]: Player;
  }

  interface GameInstance {
    players: Players;
    timer: number;
    englishTranslations: string[];
    nonEnglishTranslations: string[];
    language: Language;
  }

  // Listen for game events from server
  useEffect(() => {
    // Listen for game start

    socket.on("gameStart", (data: { wordList: string[]; roomId: string }) => {
      console.log(
        "Game started, wordList received:",
        data.wordList,
        "room id" + data.roomId
      );
      setRoomId(data.roomId);
      setCurrentWord(data.wordList[0]);
      setGameStarted(true);
      setMessage("");
      runTimer();
    });

    // Listen for next word
    socket.on("nextWord", (data: { word: string }) => {
      setCurrentWord(data.word);
      setMessage("");
    });

    // Listen for correct/incorrect answers
    socket.on("correctAnswer", (data: { message: string }) => {
      setMessage(data.message);
      setAnswer("");
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
    });

    socket.on("incorrectAnswer", (data: { message: string }) => {
      setMessage(data.message);
    });

    // Listen for game completion
    socket.on(
      "gameOver",
      (data: {
        winnerUsername: string;
        gameInstance: {
          players: Players;
          timer: number;
          englishTranslations: string[];
          nonEnglishTranslations: string[];
        };
      }) => {
        console.log("winner is " + data.winnerUsername);
        console.log(data.gameInstance.players);

        setFinishGame(true);
        setWinner(data.winnerUsername);
        setPlayers(data.gameInstance.players);
      }
    );

    return () => {
      socket.off("gameStart");
      socket.off("nextWord");
      socket.off("correctAnswer");
      socket.off("incorrectAnswer");
      socket.off("gameComplete");
      socket.off("gameOver");
    };
  }, []);

  const runTimer = () => {
    for (let i = 0; i <= timer; i++) {
      setTimeout(() => {
        console.log(timer);
        console.log(roomId);
        setTimer(timer--);
      }, i * 1000);
    }
  };

  // Submit the player's answer to the server
  const handleInputChange = (text: string) => {
    setAnswer(text);
    socket.emit("submitAnswer", { answer: text, roomId });
  };

  // Handle when the player is ready to start the game
  const handleStartGame = () => {
    setIsReady(true); // Set the player as ready
    socket.emit("playerReady", { user, language }); // Notify the server that the player is ready
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
        <Text style={styles.title}>Typing Game</Text>
        {winner && finishGame ? (
          <>
            <Text>
              Game is Over and winner is{" "}
              <Text style={styles.winnerName}>{winner}</Text>
            </Text>
            <View style={styles.scoresContainer}>
              {Object.keys(players).map((playerId) => (
                <View key={playerId} style={styles.playerSummaryContainer}>
                  <Text>
                    {players[playerId].user} got{" "}
                    {players[playerId].correctAnswers.length} question
                    {players[playerId].correctAnswers.length > 1
                      ? "s"
                      : ""}{" "}
                    right.
                  </Text>
                  <Text>{players[playerId].user}'s Correct Answers:</Text>
                  <FlatList
                    data={players[playerId].correctAnswers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text>{item}</Text>}
                  />
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.gameContainer}>
            {gameStarted ? (
              <>
                <Text style={styles.subtitle}>
                  Game Instruction: Type the correct words below
                </Text>
                <Text style={styles.wordDisplay}>{currentWord}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your answer here"
                  value={answer}
                  onChangeText={handleInputChange}
                />
                <Text style={styles.timer}>{timer} seconds remaining</Text>
                <Progress.Bar
                  progress={timer / 30} // Normalize progress from 0 to 1 based on initial time
                  width={200}
                  color="green"
                  height={10}
                  borderRadius={5}
                  animated={true}
                  style={styles.progressBar}
                />
                <Text style={styles.message}>{message}</Text>
              </>
            ) : (
              <>
                {isReady ? (
                  <Text style={styles.waiting}>
                    Waiting for another player to start...
                  </Text>
                ) : (
                  <>
                    <Button
                      title="Start Game"
                      onPress={() => {
                        languageNotSelected ? null : handleStartGame();
                      }}
                    />
                    <SelectLanguageMultiplayer
                      language={language}
                      setLanguage={setLanguage}
                      setLanguageNotSelected={setLanguageNotSelected}
                    />
                    {languageNotSelected ? (
                      <Text>Select a language!</Text>
                    ) : null}
                  </>
                )}
              </>
            )}
          </View>
        )}
      </SafeAreaView>
      <Animated.Image
        style={[styles.leftGun, rotateLeftStyle]}
        source={playerIcons.gunLeft}
      />
      <Animated.Image
        style={[styles.rightGun, rotateRightStyle]}
        source={playerIcons.gunRight}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
  gameContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  wordDisplay: {
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
  message: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
  waiting: {
    fontSize: 18,
    color: "gray",
  },
  scoresContainer: {
    marginTop: 20,
  },
  progressBar: {
    marginBottom: 50,
  },
  winnerName: {
    backgroundColor: "yellow",
    color: "red",
    fontWeight: "bold",
    padding: 5,
    borderRadius: 5,
  },
  playerSummaryContainer: {
    marginBottom: 10,
  },
  leftGun: {
    position: "absolute",
    resizeMode: "contain",
    maxWidth: "30%",
    maxHeight: "30%",
    left: 0,
    bottom: 0,
  },
  rightGun: {
    position: "absolute",
    resizeMode: "contain",
    maxWidth: "30%",
    maxHeight: "30%",
    right: 0,
    bottom: 0,
  },
});

export default Game;

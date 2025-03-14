import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Learn from "./components/Learn";
import Login from "./components/Login";
import Practice from "./components/Practice";
import Game from "./components/Game";
import FriendsList from "./components/FriendsList";
import Leaderboard from "./components/Leaderboard";
import { UserProvider } from "./components/contexts/username";
import Profile from "./components/Profile";
import { Settings } from "./components/Settings";
import wordList from "./_testdata/words";
import { Word } from "./types/globalTypes";
import { Signup } from "./components/Signup";
import Review from "./components/Review";
import ReviewGame from "./components/ReviewGame";

const Stack = createStackNavigator();

function LoadingScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App() {
  const [loaded, isLoading] = useState(true);
  // // if (isLoading === true) {
  // //   return LoadingScreen;
  // // }

  const [isLoggedin, setIsLoggedIn] = useState(false);
  return (
    <UserProvider>
      {isLoggedin ? (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <Header />
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Practice"
            >
              <Stack.Screen name="Practice" component={Practice} />
              <Stack.Screen name="Learn" component={Learn} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Game" component={Game} />
              <Stack.Screen name="FriendsList" component={FriendsList} />
              <Stack.Screen
                name="Profile"
                component={Profile}
                initialParams={{ setIsLoggedIn: setIsLoggedIn }}
              />
              <Stack.Screen name="Leaderboard" component={Leaderboard} />
              <Stack.Screen name="Review" component={Review} />
              <Stack.Screen name="ReviewGame" component={ReviewGame} />
            </Stack.Navigator>
            <Navbar />
          </NavigationContainer>
        </View>
      ) : (
        <>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Login"
                component={Login}
                initialParams={{ setIsLoggedIn: setIsLoggedIn }}
              />
              <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

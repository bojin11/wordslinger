import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import React from "react";
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Header />
          <Stack.Navigator initialRouteName="Practice">
            <Stack.Screen name="Learn" component={Learn} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Practice" component={Practice} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="FriendsList" component={FriendsList} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Leaderboard" component={Leaderboard} />
          </Stack.Navigator>
          <Navbar />
        </NavigationContainer>
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

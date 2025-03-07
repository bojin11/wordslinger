import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import friendsListData, { FriendList } from "../_testdata/friends";
import React from "react";

const FriendCard: React.FC<FriendList> = ({ username, status, avatar_url }) => (
  <View style={styles.friendCard}>
    <Text style={styles.cardTitle}>WANTED</Text>
    <Image source={{ uri: avatar_url }} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  </View>
);

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<FriendList[]>([]);

  useEffect(() => {
    setFriends(friendsListData);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>BOUNTY BOARD</Text>
        <FlatList
          data={friendsListData}
          renderItem={({ item }) => <FriendCard {...item} />}
          keyExtractor={(item) => item.username}
          numColumns={3}
        />
      </View>{" "}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontFamily: Platform.select({
      web: "Smokum",
    }),
    fontSize: 70,
    fontWeight: "bold",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  friendCard: {
    justifyContent: "center",
    alignItems: "center",
    width: 270,
    height: 310,
    borderWidth: 2,
    borderColor: "#000",
    padding: 16,
    margin: 25,
    textAlign: "center",
    backgroundColor: "#F5F5DC",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  avatar: {
    width: 130,
    height: 150,
    marginBottom: 16,
  },
  info: {
    flex: 1,
    marginBottom: 5,
    alignItems: "center",
    fontFamily: Platform.select({
      web: "Smokum",
      ios: "Smokum-Regular",
      android: "Smokum_400Regular",
    }),
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Platform.select({
      web: "Sancreek",
      ios: "Smokum-Regular",
      android: "Smokum_400Regular",
    }),
  },
  status: {
    fontSize: 14,
    color: "#777",
  },
  cardTitle: {
    fontFamily: Platform.select({
      web: "Smokum",
      ios: "Smokum-Regular",
      android: "Smokum_400Regular",
    }),
    alignItems: "center",
    // fontWeight: "bold",
    fontSize: 40,
  },
});

export default FriendsList;

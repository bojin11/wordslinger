import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ReviewCardType } from "../types/ReviewTypes";
import axios from "axios";
import { useAuth } from "./contexts/username";
import { ImageBackground } from "react-native";

function ReviewCard({ language, wordList, userID }: ReviewCardType) {
  const languageBackground = styles[`${language}`];
  const languageMastery = language + "_mastery";
  const language_review_interval_sec = language + "_review_interval_sec";
  const reviewableWordsList = wordList.filter((word: any) => {
    const mastery = word[languageMastery];
    const reviewInterval = word[language_review_interval_sec];
    switch (mastery) {
      case "beginner":
        return reviewInterval > 10 ? true : false;
      case "intermediate":
        return reviewInterval > 60 ? true : false;
      case "master":
        return reviewInterval > 300 ? true : false;
      case null:
        return false;
      default:
        return true;
    }
  });

  const navigation = useNavigation<StackNavigationProp<{ ReviewGame?: any }>>();
  function navigateToLanguage() {
    navigation.navigate("ReviewGame", {
      language,
      reviewableWordsList,
      userID,
    });
  }
  const titleForButton =
    reviewableWordsList.length !== 1
      ? `${reviewableWordsList.length} words`
      : `${reviewableWordsList.length} word`;
  return (
    <View style={[styles.card, languageBackground]}>
      <Text style={styles.langText}>{language}</Text>
      <Button
        title={titleForButton}
        disabled={reviewableWordsList.length === 0}
        onPress={navigateToLanguage}
      ></Button>
    </View>
  );
}

const Review = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState<any>();
  const [userID, setUserID] = useState();
  const { user } = useAuth();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://wordslingerserver.onrender.com/api/users/" + user)
      .then((response) => {
        setUserID(() => response.data.user[0].user_id);
        return response.data.user[0].user_id;
      })
      .then((user_ID) => {
        axios
          .get("https://wordslingerserver.onrender.com/api/reviews/" + user_ID)
          .then((response) => {
            setReviewData(() => {
              const { germanReviewData, spanishReviewData, frenchReviewData } =
                response.data.reviewData;
              return [
                ["german", germanReviewData],
                ["spanish", spanishReviewData],
                ["french", frenchReviewData],
              ];
            });
            setIsLoading(false);
          });
      });
  }, []);

  if (isLoading) {
    return (
      <View>
        <Image
          source={require("../assets/tumbleweedtransparent.gif")}
          style={{
            width: "1000%",
            height: "1000%",
            alignSelf: "center",
            resizeMode: "contain",
          }}
        />
        <Text style={{ textAlign: "center", fontSize: 20 }}>Loading...</Text>
        <ImageBackground
          style={[styles.fixed, styles.container, { zIndex: -1 }]}
          source={require("../assets/wild-west-town.png")}
        ></ImageBackground>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <View style={{ marginInline: "auto", marginBlock: "20%" }}>
          {reviewData.map((data: any) => {
            return (
              <ReviewCard
                language={data[0]}
                wordList={data[1]}
                userID={userID}
                key={data[0]}
              ></ReviewCard>
            );
          })}
        </View>
        <ImageBackground
          style={[styles.fixed, styles.container, { zIndex: -1 }]}
          source={require("../assets/wild-west-town.png")}
        ></ImageBackground>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "grey",
    flex: 1,
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen,
    marginInline: "auto",
  },
  card: {
    width: Dimensions.get("screen").width,
    height: "auto",
    marginBlockEnd: 10,
    alignItems: "center",
    paddingBlock: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  french: {
    backgroundColor: "#000091",
  },
  spanish: {
    backgroundColor: "#FFCC00",
  },
  german: {
    backgroundColor: "#AA151B",
  },
  textHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  langText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBlock: 10,
    textAlign: "center",
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Review;

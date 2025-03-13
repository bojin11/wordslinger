import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";


const backgroundUI = {
  background: require("../assets/Background4.png"),
  moutain: require("../assets/Background2.png"),

  cloud1: require("../assets/Cloud1.png"),
  cloud2: require("../assets/Cloud2.png"),
  cloud3: require("../assets/Cloud3.png"),
  cloud4: require("../assets/Cloud4.png"),
};


interface SignUpForm {
  name: string;
  username: string;
  password: string;
  avatar_url: any;
  bio: string;
  language: string;
}

const image1 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ1OS5wbmc=/794x1000/hnUX4e.png";
const image2 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ1Ny5wbmc=/794x1000/VX87t1.png";
const image3 =
  "https://img.itch.zone/aW1hZ2UvMjc2MTQwNS8xNjQ3NDQ2Mi5wbmc=/794x1000/TvwatB.png";

const SignUpValidationSchema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const Signup: React.FC = () => {
  const [newUser, setNewUser] = useState({});
  const navigateTo = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook
  const { user, setUser } = useAuth();

  useEffect(() => {
    setNewUser(newUser);
  }, []);

  const addNewUser = (values: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      setNewUser(values);
      return postNewUser(values);
    });
  };

  const postNewUser = (newUser: any) => {
    // const navigateTo = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get navigation using hook

    if (!newUser) {
      return Promise.reject({
        error: "missing new user data, please try again",
      });
    }
    return axios
      .post("https://wordslingerserver.onrender.com/api/users", newUser)
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .then(({ user }) => {
        const url = `https://wordslingerserver.onrender.com/api/leaderboard/`;
        const french = {
          user_id: user[0].user_id,
          language: "French",
        };
        const spanish = {
          user_id: user[0].user_id,
          language: "Spanish",
        };
        const german = {
          user_id: user[0].user_id,
          language: "German",
        };
        return Promise.all([
          axios.post(url, french),
          axios.post(url, spanish),
          axios.post(url, german),
        ]);
      })
      .then((data) => {})
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return (

    <>
      <ImageBackground
        style={{ flex: 1, height: "100%", width: "100%" }}
        source={backgroundUI.background}

    <View>
      <Text>Sign up</Text>
      <Formik
        validationSchema={SignUpValidationSchema}
        initialValues={{
          name: "",
          username: "",
          password: "",
          avatar_url: "image",
          bio: "",
          language: "",
        }}
        onSubmit={(values) => {
          addNewUser(values);

        }}

      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            overflow: "hidden",
            justifyContent: "flex-start",
          }}
        >
          <Image
            style={{ top: "75%", left: "-30%", width: "100%" }}
            source={backgroundUI.cloud1}
          />
          <Image
            style={{ top: "75%", right: "100%", zIndex: 3 }}
            source={backgroundUI.cloud2}
          />
          <Image
            style={{ top: "0%", right: "180%" }}
            source={backgroundUI.cloud3}
          />
          <Image
            style={{ top: "15%", right: "160%" }}
            source={backgroundUI.cloud4}
          />
        </View>
        <Image
          style={{
            position: "absolute",
            bottom: "0%",
            resizeMode: "stretch",
            width: "110%",
          }}
          source={backgroundUI.moutain}
        />

        <View style={styles.container}>
          <Text style={styles.title}>Sign up</Text>
          <Formik
            validationSchema={SignUpValidationSchema}
            initialValues={{
              name: "",
              username: "",
              password: "",
              avatar_url: "image",
              bio: "",
              language: "",
            }}
            onSubmit={(values) => {
              addNewUser(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <View>
                <TextInput
                  style={styles.pwInput}
                  placeholder="Your name"
                  onChangeText={handleChange("name")}
                  value={values.name}
                />

                <TextInput
                  style={styles.pwInput}
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {errors.username && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.username}
                  </Text>
                )}
                <TextInput
                  style={styles.pwInput}
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={true}
                />
                {errors.password && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.password}
                  </Text>
                )}
                <TextInput
                  style={styles.pwInput}
                  placeholder="Tell us about yourself"
                  onChangeText={handleChange("bio")}
                  value={values.bio}
                />

                <Form id={"radioGroupLang"}>
                  <Text style={styles.subtitle}>
                    {`Pick a starting language \n`}
                  </Text>
                  <label>
                    <Field type="radio" name="language" value="German" />
                    German
                  </label>
                  <label>
                    <Field type="radio" name="language" value="French" />
                    French
                  </label>
                  <label>
                    <Field type="radio" name="language" value="Spanish" />
                    Spanish
                  </label>
                </Form>

                <Form id={"radioGroupProfilePic"}>
                  <Text style={styles.subtitle}>Pick an avatar</Text>
                  <View style={styles.iconContainer}>
                    <label>
                      <TouchableOpacity style={styles.navButton}>
                        <Field type="radio" name="avatar_url" value={image1} />
                        <Image
                          style={[styles.image, { resizeMode: "center" }]}
                          source={image1}
                        />
                      </TouchableOpacity>
                    </label>
                  </View>
                  <View style={styles.iconContainer}>
                    <label>
                      <TouchableOpacity style={styles.navButton}>
                        <Field type="radio" name="avatar_url" value={image2} />
                        <Image
                          style={[styles.image, { resizeMode: "center" }]}
                          source={image2}
                        />
                      </TouchableOpacity>
                    </label>
                  </View>
                  <View style={styles.iconContainer}>
                    <label>
                      <TouchableOpacity style={styles.navButton}>
                        <Field type="radio" name="avatar_url" value={image3} />
                        <Image
                          style={[styles.image, { resizeMode: "center" }]}
                          source={image3}
                        />
                      </TouchableOpacity>
                    </label>
                  </View>
                </Form>

                <View>
                  {/* {( */}
                  <TouchableOpacity
                    style={buttonStyling.buttonContainer}
                    onPress={() => {
                      handleSubmit;
                    }}
                  >
                    <View style={buttonStyling.buttonActive}>
                      <Text style={buttonStyling.buttonActiveText}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                  {/* ) : (
                    <View style={buttonStyling.buttonContainer}>
                      <View style={buttonStyling.buttonInactive}>
                        <Text style={buttonStyling.buttonInactiveText}>
                          Submit
                        </Text>
                      </View>
                    </View>
                  )} */}
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 20,
    maxHeight: "190%",
    maxWidth: "90%",
    backgroundColor: "white",
    position: "relative",
    marginInline: "10%",
    bottom: "20%",
  },

  title: {
    fontSize: 24,
    marginBottom: "7.5%",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: "7.5%",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },

  pwInput: {
    width: "80%",
    padding: "2.5%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  navButton: {
    display: "flex",
    flex: 3,
    flexDirection: "row",
    borderColor: "#2583ff",
    borderRadius: 14,
    height: 60,
    width: 60,
  },
  iconContainer: {
    flex: 3,
    flexDirection: "row",
    // marginInlineEnd: 10,
    alignContent: "space-between",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

const buttonStyling = StyleSheet.create({
  buttonContainer: {
    margin: "1%",
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "flex-end",
  },
  buttonActive: {
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#878787",
    width: "50%",
  },
  buttonActiveText: {
    backgroundColor: "#BFBFBF",
    maxHeight: 80,
    color: "black",
    padding: 2,
    borderRadius: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  buttonInactive: {
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#878787",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#BFBFBF",
    width: "25%",
  },
  buttonInactiveText: {
    backgroundColor: "#878787",
    maxHeight: 80,
    color: "white",
    padding: 2,
    borderRadius: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  textLargeOverlay: {
    position: "absolute",
    top: "65%",
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
    zIndex: 2,
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
});

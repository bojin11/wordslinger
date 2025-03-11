import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

const sheriff = require("../assets/icons/Sheriff.png");
const cactus = require("../assets/icons/Cactus2.png");
const hayStack = require("../assets/icons/hay-large.png");

interface SignUpForm {
  name: string;
  username: string;
  password: string;
  avatar_url: any;
  bio: string;
  language: string;
}

const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const Signup: React.FC<{}> = () => {
  return (
    <View>
      <Text>Sign up</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          name: "",
          username: "",
          password: "",
          avatar_url: "image",
          bio: "",
          language: "",
        }}
        onSubmit={(values) => {
          console.log(values);
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
              style={styles.input}
              placeholder="Your name"
              onChangeText={handleChange("name")}
              value={values.name}
            />

            <TextInput
              style={styles.input}
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
              style={styles.input}
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
              style={styles.input}
              placeholder="Tell us about yourself"
              onChangeText={handleChange("bio")}
              value={values.bio}
            />

            <Form id={"radioGroupLang"}>
              <Text>Pick a starting language</Text>
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
              <Text>Pick an avatar</Text>
              <View style={styles.iconContainer}>
                <label>
                  <TouchableOpacity style={styles.navButton}>
                    <Field type="radio" name="avatar_url" value="1" />
                    <Image
                      style={[styles.image, { resizeMode: "center" }]}
                      source={hayStack}
                    />
                  </TouchableOpacity>
                </label>
              </View>
              <View style={styles.iconContainer}>
                <label>
                  <TouchableOpacity style={styles.navButton}>
                    <Field type="radio" name="avatar_url" value="2" />
                    <Image
                      style={[styles.image, { resizeMode: "center" }]}
                      source={hayStack}
                    />
                  </TouchableOpacity>
                </label>
              </View>
              <View style={styles.iconContainer}>
                <label>
                  <TouchableOpacity style={styles.navButton}>
                    <Field type="radio" name="avatar_url" value="3" />
                    <Image
                      style={[styles.image, { resizeMode: "center" }]}
                      source={hayStack}
                    />
                  </TouchableOpacity>
                </label>
              </View>
            </Form>

            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  navButton: {
    borderColor: "#2583ff",
    borderWidth: 1.2,
    borderRadius: 14,
    height: 60,
    width: 60,
  },
  iconContainer: {
    marginInlineEnd: 5,
    alignContent: "space-between",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 20,
    maxHeight: "30%",
    maxWidth: "90%",
    backgroundColor: "white",
    position: "relative",
    marginInline: "10%",
    bottom: "40%",
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  // input: {
  //   width: "100%",
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   borderRadius: 5,
  //   marginBottom: 10,
  //   justifyContent: "center",
  //   alignContent: "center",
  //   alignItems: "center",
  // },

  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
});

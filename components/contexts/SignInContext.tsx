// import React from "react";
// import {
//   createContext,
//   useState,
//   Dispatch,
//   SetStateAction,
//   useContext,
//   ReactNode,
//   ReactElement,
// } from "react";

// type SignInContextType = {
//   something: "string";
// };

// const SignInContext = React.createContext();

// const AuthContext = React.createContext();

// function useIsSignedIn() {
//   const isSignedIn = React.useContext(SignInContext);
//   return isSignedIn;
// }

// function useIsSignedOut() {
//   const isSignedIn = React.useContext(SignInContext);
//   return !isSignedIn;
// }

// const RootStack = createNativeStackNavigator({
//   screens: {
//     // Common screens
//   },
//   groups: {
//     SignedIn: {
//       if: useIsSignedIn,
//       screens: {
//         Home: HomeScreen,
//         Profile: ProfileScreen,
//       },
//     },
//     SignedOut: {
//       if: useIsSignedOut,
//       screens: {
//         SignIn: SignInScreen,
//         SignUp: SignUpScreen,
//         ResetPassword: ResetPasswordScreen,
//       },
//     },
//   },
// });

// //TIP: If you have both your login-related screens and rest of the screens in Stack navigators, we recommend to use a single Stack navigator and place the conditional inside instead of using 2 different navigators. This makes it possible to have a proper transition animation during login/logout.

// if (isLoading) {
//   // We haven't finished checking for the token yet
//   return <SplashScreen />;
// }

// const isSignedIn = userToken != null;

// return (
//   <SignInContext.Provider value={isSignedIn}>
//     <Navigation />
//   </SignInContext.Provider>
// );

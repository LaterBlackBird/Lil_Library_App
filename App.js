import { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import initialize, { fireAuth } from "./src/app/utils/initializaiton";
import { onAuthStateChanged } from "firebase/auth";
import * as Network from "expo-network";

import { navigationRef } from "./src/app/services/RootNavigation";
import { checkIfUserIsSignedIn, signOutUser } from "./src/app/services/UserService";
import { LibraryProvider } from "./src/app/context/LibraryContext";
import { LocationProvider } from "./src/app/context/LocationContext";
import { CreationAlertProvider } from "./src/app/context/creationAlertContext";
import { UserProvider } from "./src/app/context/UserContext";

import LoginForm from "./src/app/components/organisms/LoginForm";
import SignUpForm from "./src/app/components/organisms/SignUpForm";
import MainPage from "./src/app/components/organisms/MainPage";
import LibraryProfile from "./src/app/components/organisms/LibraryProfile";
import LibraryEdits from "./src/app/components/organisms/LibraryEdits";
import BookSearch from "./src/app/components/organisms/BookSearch";
import UserProfile from "./src/app/components/organisms/UserProfile";

const Stack = createNativeStackNavigator();
initialize();

export default function App() {
  const [userAuthroized, setUserAuthorized] = useState(false);
  
  // Watch for user Login or Logout
  useEffect(() => {
    let run = true;
    if (run) {
      onAuthStateChanged(fireAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUserAuthorized(true);
        } else {
          // User is signed out
          setUserAuthorized(false);
        }
      });
    };

    return () => run = false;
  }, [onAuthStateChanged]);

  // Watch for user Login or Logout

  // useEffect(() => {
  //   initialize();
  // }, []);

  // useEffect(() => {
  //   let run = true;
  //   const runThis = async () => {
  //     if (run) setUserAuthorized(await checkIfUserIsSignedIn());
  //   }
  //   runThis();
  //   return () => (run = false);
  // }, [onAuthStateChanged]);

  // useEffect(() => {
  //   const runThis = async () => {
  //     console.log(await Network.getNetworkStateAsync());
  //   };
  //   runThis();
  // });

  // useEffect(() => {
  //   console.log(userAuthroized);
  // }, [userAuthroized]);

  const renderScreensForUnauthorizedUsers = () => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginForm}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpForm}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const renderAuthorizedUserScreens = () => {
    return (
      <LocationProvider>
        <LibraryProvider>
          <CreationAlertProvider>
            <UserProvider>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={MainPage}
                    options={{
                      headerShown: false,
                      animationTypeForReplace: "pop",
                    }}
                  />
                  <Stack.Screen
                    name="LibraryProfile"
                    component={LibraryProfile}
                    options={{
                      headerShown: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="LibraryOptions"
                    component={LibraryEdits}
                    options={{
                      headerShown: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="BookSearch"
                    component={BookSearch}
                    options={{
                      headerShown: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="UserProfile"
                    component={UserProfile}
                    options={{
                      headerShown: false,
                      animation: "slide_from_right",
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </UserProvider>
          </CreationAlertProvider>
        </LibraryProvider>
      </LocationProvider>
    );
  };

  return (
    <>
      {!userAuthroized && renderScreensForUnauthorizedUsers()}
      {userAuthroized && renderAuthorizedUserScreens()}
    </>
  );
}

const styles = StyleSheet.create({});

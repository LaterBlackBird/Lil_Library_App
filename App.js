import { useEffect, useState, useMemo, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/app/services/RootNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import initialize, { fireAuth } from "./src/app/services/initializaiton";
import { onAuthStateChanged } from "firebase/auth";

import { LibraryProvider } from "./src/app/context/LibraryContext";
import { LocationProvider } from "./src/app/context/LocationContext";
import { CreationAlertProvider } from "./src/app/context/creationAlertContext";
import { UserProvider } from "./src/app/context/UserContext";
import { BookProvider } from "./src/app/context/BookContext";

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

  return (
    <LibraryProvider>
      <LocationProvider>
        <CreationAlertProvider>
          <UserProvider>
            <BookProvider>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                  {userAuthroized === false ? (
                    <>
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
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </Stack.Navigator>
              </NavigationContainer>
            </BookProvider>
          </UserProvider>
        </CreationAlertProvider>
      </LocationProvider>
    </LibraryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

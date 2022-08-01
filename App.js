import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initialize, { fireAuth } from './services/initializaiton';
import { onAuthStateChanged } from 'firebase/auth';

import { LibraryProvider } from './context/libraryContext';

import LoginForm from './components/organisms/LoginForm';
import SignUpForm from './components/organisms/SignUpForm';
import MainPage from './components/organisms/MainPage';
import LibraryProfile from './components/organisms/LibraryProfile';
import LibraryEdits from './components/organisms/LibraryEdits';

const Stack = createNativeStackNavigator();
initialize();

export default function App() {
  const [userAuthroized, setUserAuthorized] = useState(false);

  // Watch for user Login or Logout
  useEffect(() => {
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
  }, [onAuthStateChanged]);
    
  return (
    <LibraryProvider>
      <NavigationContainer>
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LibraryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

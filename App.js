import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initialize, { fireAuth } from './utils';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import LibraryProfile from './screens/LibraryProfile';

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
    <NavigationContainer>
      <Stack.Navigator>
        {userAuthroized === false ?
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="SignUp"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </>
          :
          <>
            <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              animationTypeForReplace: 'pop'
            }}
            />
            <Stack.Screen
            name="LibraryProfile"
            component={LibraryProfile}
            options={{
              headerShown: false,
            }}
            />
          </>
        }

      </Stack.Navigator>
    </NavigationContainer>
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

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
              options={{
                headerShown: false,
              }}
              name="Login"
              component={Login}
            />

            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SignUp"
              component={Register}
            />
          </>
          :
          <Stack.Screen
            options={{
              headerShown: false,
              animationTypeForReplace: 'pop'
            }}
            name="Home"
            component={Home}
          />
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

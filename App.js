import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initialize, { fireAuth } from './utils';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
initialize();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {}
        <Stack.Screen options={ {headerShown: false} } name="Login" component={Login} />
        <Stack.Screen options={ {headerShown: false} } name="SignUp" component={Register} />
        <Stack.Screen options={ {headerShown: false} } name="Home" component={Home} />
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

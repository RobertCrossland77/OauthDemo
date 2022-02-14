import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import LambdaScreen from './src/screens/LambdaScreen';
import {AuthProvider} from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{title: 'Auth'}}
      />
      <Stack.Screen
        name="Lambda"
        component={LambdaScreen}
        options={{title: 'Lambda'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

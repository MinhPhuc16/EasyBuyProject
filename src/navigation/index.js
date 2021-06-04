import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/Splash/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import LogInScreen from '../screens/LogInScreen/redux/LogInScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import {theme} from '../common/theme';
import firebase from '@react-native-firebase/app';
import {FIREBASE_CONFIG} from '../common/config';
import {Provider} from 'react-native-paper';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export default function AppContainer() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="LogInScreen" component={LogInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

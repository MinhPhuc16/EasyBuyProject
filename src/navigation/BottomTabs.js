import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import CartScreen from '../screens/CartScreen/CartScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import UserScreen from '../screens/UserScreen/UserScreen';

import OptionsScreen from '../screens/OptionsScreen/OptionsScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/home_1.png')}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/user_1.png')}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/shopping-cart_1.png')}
              color={color}
              size={size}
            />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="OptionsScreen"
        component={OptionsScreen}
        options={{
          tabBarLabel: 'Options',
          tabBarIcon: ({color, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/menu_4.png')}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

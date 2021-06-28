import React from 'react';

import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {Image} from 'react-native';
import {CartScreen} from '../screens/CartScreen/CartScreen';
import {HomeStack} from '../navigation/HomeStack';
import {UserStack} from '../navigation/UserStack';
import {ShopStack} from '../navigation/ShopStack';
import {OptionsStack} from '../navigation/OptionsStack';

const Tab = AnimatedTabBarNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
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
        name="UserStack"
        component={UserStack}
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
        name="ShopStack"
        component={ShopStack}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({color, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/shopping-bag_1.png')}
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
        name="OptionsStack"
        component={OptionsStack}
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

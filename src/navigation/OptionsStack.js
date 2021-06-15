import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MyOrders} from '../screens/MyOrders/MyOrders';
import {ShippingAddressesScreen} from '../screens/ShippingAddressesScreen/ShippingAddressesScreen';
import LanguageScreen from '../screens/LanguageScreen/LanguageScreen';
import {theme} from '../common/theme';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen/PaymentMethodsScreen';
import {TouchableOpacity} from 'react-native';
import OptionsScreen from '../screens/OptionsScreen/OptionsScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import {FavoriteScreen} from '../screens/FavoriteScreen/FavoriteScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {Navigator, Screen} = createStackNavigator();
export const OptionsStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.BACKGROUND,
          elevation: 0,
        },
        headerTintColor: theme.colors.TEXT,
        headerTitleStyle: {
          textAlign: 'center',
          marginRight: 50,
        },
      }}>
      <Screen
        options={{headerShown: false}}
        name="OptionsScreen"
        component={OptionsScreen}
      />
      <Screen
        options={{headerShown: false}}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <Screen
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: theme.colors.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: theme.colors.TEXT,
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="MyOrders"
        component={MyOrders}
      />
      <Screen
        options={({navigation}) => ({
          title: 'Language',
          headerStyle: {
            backgroundColor: theme.colors.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: theme.colors.TEXT,
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="LanguageScreen"
        component={LanguageScreen}
      />
      <Screen
        options={({navigation}) => ({
          title: 'Shipping Addresses',
          headerStyle: {
            backgroundColor: theme.colors.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: theme.colors.TEXT,
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="ShippingAddressesScreen"
        component={ShippingAddressesScreen}
      />
      <Screen
        options={({navigation}) => ({
          title: 'Payment Methods',
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="PaymentMethodsScreen"
        component={PaymentMethodsScreen}
      />
      <Screen
        options={({navigation}) => ({
          title: 'Payment Methods',
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="FavoriteScreen"
        component={FavoriteScreen}
      />
    </Navigator>
  );
};

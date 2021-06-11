import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from '../screens/UserScreen/UserScreen';
import {OrderDetails} from '../screens/OrderDetails/OrderDetails';
import {MyOrders} from '../screens/MyOrders/MyOrders';
import {AddingShippingAddress} from '../screens/AddingShippingAddress/AddingShippingAddress';
import {ShippingAddressesScreen} from '../screens/ShippingAddressesScreen/ShippingAddressesScreen';
import {theme} from '../common/theme';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen/PaymentMethodsScreen';
import {Image} from 'react-native';
const {Navigator, Screen} = createStackNavigator();
export const UserStack = () => {
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
        name="UserScreen"
        component={UserScreen}
      />
      <Screen
        options={({navigation}) => ({
          title: 'Order Details',
          headerStyle: {
            backgroundColor: theme.colors.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: theme.colors.TEXT,
          headerLeft: () => <Back onPress={() => navigation.goBack()} />,
        })}
        name="OrderDetails"
        component={OrderDetails}
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
            <Image
              source={require('../assets/images/left-arrow.png')}
              height={26}
              width={24}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        name="MyOrders"
        component={MyOrders}
      />
      <Screen
        options={({navigation}) => ({
          title: 'Adding Shipping Address',
          headerStyle: {
            backgroundColor: theme.colors.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: theme.colors.TEXT,
          headerLeft: () => (
            <Image
              source={require('../assets/images/left-arrow.png')}
              height={26}
              width={24}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        name="AddingShippingAddress"
        component={AddingShippingAddress}
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
            <Image
              source={require('../assets/images/left-arrow.png')}
              height={26}
              width={24}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        name="ShippingAddressesScreen"
        component={ShippingAddressesScreen}
      />
      <Screen
        options={({navigation}) => ({
          title: 'Payment Methods',
          headerLeft: () => (
            <Image
              source={require('../assets/images/left-arrow.png')}
              height={26}
              width={24}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        name="PaymentMethodsScreen"
        component={PaymentMethodsScreen}
      />
    </Navigator>
  );
};

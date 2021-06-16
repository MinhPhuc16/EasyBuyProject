import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {SingleProductScreen} from '../screens/SingleProductScreen/SingleProductScreen';
import {theme} from '../common/theme';
import {RatingReviewScreen} from '../screens/RatingReviewScreen/RatingReviewScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {Navigator, Screen} = createStackNavigator();
export const HomeStack = () => {
  return (
    <Navigator>
      <Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Screen
        name="SingleProductScreen"
        component={SingleProductScreen}
        options={({route}) => ({
          title: route.params.product.name.toLowerCase(),
          headerStyle: {
            backgroundColor: theme.colors.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: theme.colors.TEXT,
          headerTitleStyle: {
            textAlign: 'center',
          },
        })}
      />
      <Screen
        name="RatingReviewScreen"
        component={RatingReviewScreen}
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
      />
    </Navigator>
  );
};

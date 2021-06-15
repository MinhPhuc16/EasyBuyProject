import React from 'react';
import {CategoriesOf} from '../screens/CategoriesOf/CategoriesOf';
import {createStackNavigator} from '@react-navigation/stack';
import {Categories} from '../screens/Categories/Categories';
import {Catalog} from '../screens/Catalog/Catalog';
import {SingleProductScreen} from '../screens/SingleProductScreen/SingleProductScreen';
import {RatingReviewScreen} from '../screens/RatingReviewScreen/RatingReviewScreen';
import {Filters} from '../screens/Filter/FiltersScreen';
import {theme} from '../common/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';

const {Navigator, Screen} = createStackNavigator();
export const ShopStack = () => {
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
        },
      }}>
      <Screen
        options={({navigation}) => ({
          title: 'Categories',
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="Shop"
        component={Categories}
      />
      <Screen
        options={({navigation}) => ({
          title: 'Categories',

          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="CategoriesOf"
        component={CategoriesOf}
      />
      <Screen
        options={({navigation}) => ({
          title: '',

          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="Catalog"
        component={Catalog}
      />

      <Screen
        options={({route, navigation}) => ({
          title: route.params.product.name.toLowerCase(),
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="SingleProductScreen"
        component={SingleProductScreen}
      />

      <Screen
        options={({navigation}) => ({
          title: 'Filters',
          headerLeft: () => (
            <TouchableOpacity>
              <AntDesign name="left" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        })}
        name="FiltersScreen"
        component={Filters}
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

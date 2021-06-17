import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
import {theme} from '../../common/theme';
import {Btn} from '../../components/Btn';
import {ProductCard} from '../../components/ProductCard';
import {selectUserData, getCurrentUserData} from '../../store/users';
import {connect} from 'react-redux';
import {totalAmount} from '../../components/Calculations';
import {GLOBAL_STYLES} from '../../common/globalStyles';

const mapStateToProps = state => ({
  usersData: selectUserData(state),
});
export const CartScreen = connect(mapStateToProps, {
  getCurrentUserData,
})(({getCurrentUserData, usersData, navigation}) => {
  let bagProducts;
  if (usersData.userProductsInBag) {
    bagProducts = usersData.userProductsInBag;
  } else {
    bagProducts = [];
  }
  const handleUserData = async () => {
    try {
      await getCurrentUserData();
    } catch (error) {
      console.log('getCurrentUserData', error);
    }
  };
  const handleCheckOut = () => {
    if (bagProducts.length) {
      navigation.navigate('CheckoutScreen ', {
        bagProducts: bagProducts,
      });
    } else {
      Alert.alert('Error', 'Please add product before ordering!');
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>My Cart</Text>
      {bagProducts.length ? (
        <FlatList
          data={bagProducts}
          renderItem={({item}) => (
            <View style={styles.card}>
              <ProductCard isInFavs={true} product={item} isRowView={true} />
            </View>
          )}
          keyExtractor={item => `${item.id}${item.size}${item.color}`}
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <Text style={{fontSize: 16.6, color: theme.colors.SALE}}>
            Sorry, You don't have any products in Bag.
          </Text>
        </View>
      )}
      <View style={styles.amountContainer}>
        <Text weight={'bold'} style={styles.amount}>
          Total amount:
        </Text>
        <Text weight={'bold'} style={styles.totalCost}>
          ${Math.floor(totalAmount(bagProducts))}
        </Text>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Btn
          onPress={() => handleCheckOut()}
          width={Dimensions.get('window').width - 32}
          height={50}
          bgColor={theme.colors.primary}
          btnName={'CHECK OUT'}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  title: {
    color: theme.colors.secondary,
    fontSize: 34,
    lineHeight: 34,
    marginVertical: 30,
    paddingTop: 30,
    fontWeight: 'bold',
  },
  amount: {
    color: theme.colors.GRAY,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 28,
  },
  totalCost: {
    color: theme.colors.TEXT,
    fontSize: 18,
    lineHeight: 22,
    marginRight: 28,
  },
  btn: {
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 10,
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

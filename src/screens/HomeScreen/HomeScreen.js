import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Btn} from '../../components/Btn';
import {getCurrentUserData} from '../../store/users';
import {ProductCard} from '../../components/ProductCard';
import {
  selectSaleProductData,
  getOnSaleProducts,
  selectNewProductData,
  getNewData,
  getFilteredProducts,
} from '../../store/products';
import {theme} from '../../common/theme';

const mapStateToProps = state => ({
  saleProducts: selectSaleProductData(state),
  newProducts: selectNewProductData(state),
});
const Home = connect(mapStateToProps, {
  getOnSaleProducts,
  getNewData,
  getCurrentUserData,
  getFilteredProducts,
})(
  ({
    getNewData,
    newProducts,
    saleProducts,
    getOnSaleProducts,
    navigation,
    getCurrentUserData,
    getFilteredProducts,
  }) => {
    const [showSale, setShowSale] = useState(false);

    const handleNewProducts = async () => {
      try {
        await getNewData('isNew');
      } catch (error) {
        console.log('getNewData', error);
      }
    };
    const handleOnSaleProducts = async () => {
      setShowSale(true);
      try {
        await getOnSaleProducts('sale');
      } catch (error) {
        console.log('getOnSaleProducts', error);
      }
    };
    const handleGetCurrentUserData = async () => {
      try {
        const user = await getCurrentUserData();
        console.log('user home', user);
      } catch (error) {
        console.log('getCurrentUserData', error);
      }
    };

    useEffect(() => {
      handleNewProducts();
      handleGetCurrentUserData();
    }, []);

    return (
      <ScrollView style={styles.container}>
        {showSale ? (
          <>
            <Image
              source={require('../../assets/images/Rosee.jpeg')}
              style={{width: '100%', height: 196}}
            />
            <View style={styles.newItemsWrap}>
              <Text style={styles.categoryTitle} weight="bold">
                Sale
              </Text>

              <Text style={styles.description}>Super Summer Sale</Text>
              <FlatList
                horizontal
                contentContainerStyle={{
                  paddingTop: 15,
                }}
                data={saleProducts}
                renderItem={({item}) => (
                  <ProductCard
                    product={item}
                    isOnSale={true}
                    isInCatalog={true}
                    navigation={navigation}
                    onPress={() =>
                      navigation.navigate('SingleProductScreen', {
                        product: item,
                        products: saleProducts.filter(
                          product => product.categoryName === item.categoryName,
                        ),
                      })
                    }
                  />
                )}
                keyExtractor={item => item.productType}
              />
            </View>
          </>
        ) : (
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/Rosee.jpeg')}
              style={{width: '100%', height: 480}}
            />
            <Text style={styles.title}>Fashion sale</Text>
            <View style={styles.btn}>
              <Btn
                btnName="Check"
                bgColor={theme.colors.primary}
                height={36}
                width={160}
                onPress={() => handleOnSaleProducts()}
              />
            </View>
          </View>
        )}
        <View style={styles.newItemsWrap}>
          <Text style={styles.categoryTitle}>New</Text>
          <Text style={styles.description}>You've never seen it before</Text>

          <FlatList
            horizontal
            contentContainerStyle={{
              paddingTop: 15,
            }}
            data={newProducts}
            renderItem={({item}) => (
              <ProductCard
                product={item}
                isNew={true}
                isInCatalog={true}
                navigation={navigation}
                onPress={() =>
                  navigation.navigate('SingleProductScreen', {
                    product: item,
                    products: newProducts.filter(
                      product => product.categoryName === item.categoryName,
                    ),
                  })
                }
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    );
  },
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: '100%',
  },
  title: {
    fontSize: 48,
    position: 'absolute',
    bottom: 88,
    left: 15,
    width: 190,
    color: theme.colors.TEXT,
  },
  btn: {
    position: 'absolute',
    left: 15,
    bottom: 34,
  },
  newItemsWrap: {
    backgroundColor: theme.colors.BACKGROUND,
    paddingLeft: 15,
    paddingTop: 20,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 34,
    color: theme.colors.TEXT,
  },
  description: {
    color: theme.colors.GRAY,
    fontSize: 11,
    marginBottom: 10,
  },
});

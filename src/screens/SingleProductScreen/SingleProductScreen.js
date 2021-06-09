import React, {useState, useEffect} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {theme} from '../../common/theme';
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
import {SizeContainer} from '../../components/SizeContainer';
import {GLOBAL_STYLES} from '../../common/globalStyles';
import {BottomModal} from '../../components/bottomModal';
import StarRating from 'react-native-star-rating';
import {
  averageRatingCalc,
  totalRatingCalc,
} from '../../components/Calculations';
import {getCurrentProduct} from '../../store/products';
import {connect} from 'react-redux';
import {Btn} from '../components/Btn';
import {addProductToUsersBag} from '../../api/auth';

export const SingleProductScreen = connect(null, {
  addProductToUsersBag,
  getCurrentProduct,
})(({route, addProductToUsersBag, navigation, getCurrentProduct}) => {
  useEffect(() => {
    handleGetCurrentProduct();
  }, []);
  const {id, about, price, imagesUrls, name, rating, colors, count, onSale} =
    route.params.product;
  const [isSizeClicked, setIsSizeClicked] = useState(false);
  const [isColorClicked, setIsColorClicked] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [addProduct, setAddProduct] = useState({
    selectedCount: 1,
    id: id,
    name: name,
    price: price,
    count: count,
    imagesUrls: imagesUrls,
    size: '',
    color: '',
    onSale: onSale == undefined ? {} : onSale,
  });
  const [isClicked, setIsClicked] = useState({
    S: false,
    M: false,
    L: false,
  });

  const {products} = route.params;
  const {product} = route.params;
  const size = ['S', 'M', 'L'];
  const colorsArray = colors.map(colorObj => colorObj.color);

  const handleGetCurrentProduct = async () => {
    try {
      await getCurrentProduct(id);
    } catch (error) {
      console.log('handleGetCurrentProduct', error);
    }
  };
  const handleAddToCart = () => {
    if (addProduct.color && addProduct.size) {
      addProductToUsersBag(addProduct, false);
      setIsSizeClicked(false);
      setIsColorClicked(false);
      Alert.alert('Success', 'The product added to your cart!');
    } else {
      Alert.alert('Error', 'Please choose both color and size!');
    }
  };
  const handleFavoriteProduct = () => {
    addProductToUsersBag(product, true);
    setIsHeartClicked(!isHeartClicked);
  };
  const handleSize = size => {
    setIsClicked({...false, [size]: !isClicked[`${size}`]});
    setAddProduct(prevState => ({
      ...prevState,
      ['size']: size,
    }));
  };
  const handleColor = color => {
    setAddProduct(prevState => ({
      ...prevState,
      ['color']: color,
    }));
    setIsSizeClicked(!isColorClicked);
  };

  const salePrice =
    onSale !== undefined && onSale.discount !== undefined
      ? Math.floor((+price * (100 - +onSale.discount)) / 100)
      : null;

  return (
    <View style={styles.container}>
      <ScrollView>
        <SliderBox
          images={imagesUrls}
          resizeMode="contain"
          sliderBoxHeight={340}
          circleLoop={true}
          dotColor={theme.colors.primary}
        />
        <View style={styles.main}>
          <View style={styles.firstRow}>
            <SizeContainer
              width={130}
              name={addProduct.size ? addProduct.size : 'Size'}
              onPress={() => setIsSizeClicked(!isSizeClicked)}
              isClicked={isSizeClicked}
              bgColor={addProduct.size ? theme.colors.primary : null}
              borderWidth={addProduct.size ? 0 : 0.4}
            />
            <SizeContainer
              onPress={() => setIsColorClicked(!isColorClicked)}
              isClicked={isColorClicked}
              width={130}
              name="Color"
              bgColor={addProduct.color ? addProduct.color : null}
              borderWidth={addProduct.color ? 0 : 0.4}
            />
            <View style={{width: 38}}>
              <Heart
                width={30}
                height={30}
                hasContainer={false}
                isHeartClicked={isHeartClicked}
                onPress={() => handleFavoriteProduct()}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.priceRow}>
              <Text
                style={{
                  ...styles.bigText,
                  ...{
                    textDecorationLine:
                      onSale !== undefined && onSale.discount !== undefined
                        ? 'line-through'
                        : null,
                  },
                }}
                weight="bold">
                {`${price}$`}
              </Text>
              {onSale !== undefined && onSale.discount !== undefined ? (
                <Text
                  style={{
                    ...styles.bigText,
                    ...{color: theme.colors.SALE, marginLeft: 10},
                  }}
                  weight="bold">
                  {`${salePrice}$`}
                </Text>
              ) : null}
            </View>
          </View>
          <Text style={styles.clothName}>{name}</Text>
          <TouchableOpacity
            style={styles.ratingRow}
            onPress={() =>
              navigation.navigate('RatingReviewScreen', {
                productID: id,
              })
            }>
            <StarRating
              disabled={true}
              fullStarColor={theme.colors.STAR}
              starSize={14}
              starStyle={{margin: 3}}
              containerStyle={{marginTop: 8, width: 80}}
              maxStars={5}
              rating={averageRatingCalc(rating)}
            />
            <Text style={styles.ratingCount}>({totalRatingCalc(rating)})</Text>
          </TouchableOpacity>
          <Text style={styles.descText}>{about}</Text>
          <Text style={styles.suggestionText} weight="bold">
            You can also like this
          </Text>
          {products.length !== 1 ? (
            <FlatList
              data={products}
              horizontal={true}
              renderItem={({item}) => (
                <View>
                  {id !== item.id ? (
                    <ProductCard
                      isInCatalog={true}
                      product={item}
                      isRowView={false}
                      onPress={() =>
                        navigation.navigate('SingleProductScreen', {
                          product: item,
                          products: products,
                        })
                      }
                    />
                  ) : null}
                </View>
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>Similar products to this item will be available soon!</Text>
          )}
        </View>
      </ScrollView>

      {isSizeClicked ? (
        <BottomModal
          title={'Select Size'}
          data={size}
          height={300}
          handlePress={item => handleSize(item)}
          isClicked={isClicked}
          closeModal={() => setIsSizeClicked(false)}
        />
      ) : null}
      {isColorClicked ? (
        <BottomModal
          title={'Select Color'}
          height={350}
          data={colorsArray}
          handlePress={item => {
            handleColor(item);
          }}
          isColor={true}
          closeModal={() => setIsColorClicked(false)}
        />
      ) : null}

      <Btn
        height={50}
        width={Dimensions.get('window').width - 32}
        bgColor={theme.colors.primary}
        btnName="ADD TO CART"
        containerStyle={{marginHorizontal: 16}}
        onPress={() => {
          handleAddToCart();
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.BACKGROUND,
  },
  main: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    width: 140,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  bigText: {
    fontSize: 24,
  },
  typeText: {
    fontSize: 11,
    color: theme.colors.GRAY,
  },
  descText: {
    fontSize: 14,
  },
  suggestionText: {
    fontSize: 18,
    marginVertical: 20,
  },

  clothName: {
    fontSize: 11,
    color: theme.colors.GRAY,
  },
  ratingCount: {
    color: theme.colors.GRAY,
    marginTop: 10,
    marginLeft: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
});

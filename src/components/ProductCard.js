import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {theme} from '../common/theme';
import StarRating from 'react-native-star-rating';
import {ProductTag} from '../common/ProductTag';
import {Counter} from './Counter';
import {averageRatingCalc, totalRatingCalc} from '../components/Calculations';
import {selectAllProductData} from '../store/products';
import {connect} from 'react-redux';
import {columnStyles} from '../../src/common/globalStyles';
import {setCountSize, addProductToUsersBag} from '../api/auth';

const mapStateToProps = state => ({
  allProducts: selectAllProductData(state),
});
export const ProductCard = connect(mapStateToProps, {
  setCountSize,
  addProductToUsersBag,
})(
  ({
    setCountSize,
    addProductToUsersBag,
    product,
    isRowView = false,
    isNew,
    isOnSale,
    isInOrders = false,
    onPress,
    onLongPress,
  }) => {
    const {
      id,
      name,
      price,
      size,
      color,
      rating,
      imagesUrls,
      count,
      onSale,
      selectedCount,
    } = product;

    const cardWrapperStyles = [
      isRowView ? styles.cardWrapper : columnStyles.cardWrapper,
      {opacity: count === 0 ? 0.5 : 1},
    ];

    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [defaultCount, setDefaultCount] = useState(selectedCount);

    const handleFavoriteProduct = () => {
      addProductToUsersBag(product, true);
      setIsHeartClicked(!isHeartClicked);
    };

    const salePrice =
      onSale !== undefined && onSale.discount !== undefined
        ? Math.floor((+price * (100 - +onSale.discount)) / 100)
        : null;

    const handleCount = async count => {
      try {
        await setCountSize({
          productID: id,
          color: color,
          size: size,
          selectedCount: count,
        });
      } catch (error) {
        console.log('getCurrentUserData', error);
      }
    };
    return (
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        <View style={cardWrapperStyles}>
          <View style={isRowView ? styles.imgWrapper : columnStyles.imgWrapper}>
            {isNew ? <ProductTag style={styles.tag} title="new" /> : null}

            {isOnSale ? (
              <ProductTag
                style={{...styles.tag, backgroundColor: theme.colors.primary}}
                title={`${onSale.discount}%`}
              />
            ) : null}
            <Image
              source={{
                uri:
                  imagesUrls[0] ||
                  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
              }}
              style={isRowView ? styles.productImg : columnStyles.productImg}
            />

            {count === 0 && (
              <View style={styles.soldOut}>
                <Text>Sorry, this item is currently sold out</Text>
              </View>
            )}
          </View>

          {isInCatalog ? (
            <View style={styles.description}>
              <View style={styles.row}>
                <StarRating
                  disabled={true}
                  fullStarColor={theme.colors}
                  starSize={14}
                  starStyle={{margin: 3}}
                  containerStyle={{marginTop: 10, width: 80}}
                  maxStars={5}
                  rating={averageRatingCalc(rating)}
                />
                <Text style={styles.ratingCount}>
                  ({totalRatingCalc(rating)})
                </Text>
              </View>
              <Text weight="medium">{name.toLowerCase()}</Text>

              <View style={styles.priceRow}>
                <Text
                  style={{
                    color: isOnSale ? theme.colors.GRAY : COLORS.TEXT,
                    textDecorationLine: isOnSale ? 'line-through' : null,
                  }}>
                  {`${price}$`}
                </Text>

                {isOnSale ? (
                  <Text style={{color: theme.colors.SALE, marginLeft: 10}}>
                    {`${salePrice}$`}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : (
            <View style={styles.description}>
              <Text
                style={{marginTop: 5, marginBottom: 5, marginRight: 15}}
                weight="medium">
                {name.toUpperCase()}
              </Text>

              {isInOrders ? null : (
                <TouchableOpacity
                  style={styles.cross}
                  onPress={() =>
                    addProductToUsersBag(product, false, false, true)
                  }>
                  <Image
                    source={require('../assets/images/close.png')}
                    height="20"
                    width="20"
                  />
                </TouchableOpacity>
              )}
              <View style={styles.rowBag}>
                <View style={[styles.row, {marginRight: 10}]}>
                  <Text style={{color: theme.colors.GRAY}}>Color: </Text>
                  <Text> {color} </Text>
                </View>

                <View style={styles.row}>
                  <Text style={{color: theme.colors.GRAY}}>Size:</Text>
                  <Text>{size}</Text>
                </View>
              </View>
              <View style={styles.row}>
                {isInOrders ? (
                  <View style={[styles.row, {marginRight: 10}]}>
                    <Text style={{color: theme.colors.GRAY}}>Units: </Text>
                    <Text> {selectedCount} </Text>
                  </View>
                ) : (
                  <Counter
                    count={defaultCount}
                    handleMinus={() => {
                      setDefaultCount(
                        defaultCount === 1 ? defaultCount : defaultCount - 1,
                      ),
                        handleCount(defaultCount - 1);
                    }}
                    handlePlus={() => {
                      setDefaultCount(defaultCount + 1),
                        handleCount(defaultCount + 1);
                    }}
                  />
                )}

                <View>
                  {onSale !== undefined && onSale.discount !== undefined ? (
                    <Text
                      style={{
                        color: theme.colors.SALE,
                        marginLeft: 10,
                        fontSize: 17,
                      }}>
                      {`${salePrice * defaultCount}$`}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: isOnSale ? theme.colors.GRAY : theme.colors.TEXT,
                        lineHeight: 45,
                        fontSize: 19,
                        textDecorationLine:
                          onSale !== undefined && onSale.discount !== undefined
                            ? 'line-through'
                            : null,
                      }}>
                      {`${price * defaultCount}$`}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
          {isInFavs || isInOrders ? null : (
            <Image
              source={require('../assets/images/heart.png')}
              height="20"
              width="20"
              isHeartClicked={isHeartClicked}
              onPress={() => handleFavoriteProduct()}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  cardWrapper: {
    height: 110,
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: theme.colors.GRAY,
    marginVertical: 13,
    position: 'relative',
  },

  tag: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 3,
  },
  description: {
    padding: 10,
    paddingTop: 0,
    justifyContent: 'space-between',
    flex: 1,
  },

  imgWrapper: {
    width: 110,
    height: 110,
    overflow: 'hidden',
    position: 'relative',
  },

  productImg: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rowBag: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  soldOut: {
    height: 36,
    opacity: 0.7,
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.colors.DARK,
  },

  priceRow: {
    flexDirection: 'row',
  },
  ratingCount: {
    color: theme.colors.GRAY,
    marginTop: 10,
    marginLeft: 15,
  },
  cross: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -13,
    right: 0,
  },
});

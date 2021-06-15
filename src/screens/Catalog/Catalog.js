import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import {theme} from '../../common/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ProductCard} from '../../components/ProductCard';
import {
  selectAllProductData,
  selectFilteredProducts,
  getFilteredProducts,
} from '../../store/products';
import {connect} from 'react-redux';
import {GLOBAL_STYLES} from '../../common/globalStyles';
import {SortByModal} from '../../components/SortByModals';

const mapStateToProps = state => ({
  allProducts: selectAllProductData(state),
  sortedProducts: selectFilteredProducts(state),
});
export const Catalog = connect(mapStateToProps, {getFilteredProducts})(
  ({allProducts, route, navigation, sortedProducts, getFilteredProducts}) => {
    const {
      name,
      isWomanClicked,
      categoryName,
      isOnSale = false,
      isFiltered = false,
      filteredProducts,
    } = route.params;

    const products = allProducts.allProducts;

    const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState({
      lowestToHigh: false,
      highestToLow: false,
    });
    const [isSortingType, setIsSortingType] = useState('Price');
    const [isSorted, setIsSorted] = useState(false);
    const [isListView, setIsListView] = useState(true);

    const sortType =
      isSortingType === 'Price: highest to low'
        ? 'desc'
        : isSortingType === 'Price: lowest to high'
        ? 'asc'
        : null;

    const sortedFields = {
      category: name,
      gender: isWomanClicked ? 'women' : 'men',
      isSortClicked: true,
      sortType,
    };

    const sortOptions = [
      {
        sortingName: 'Price: lowest to high',
        sortOptionBool: 'lowestToHigh',
      },
      {
        sortingName: 'Price: highest to low',
        sortOptionBool: 'highestToLow',
      },
    ];

    const sortingHandler = async () => {
      try {
        await getFilteredProducts(sortedFields);
      } catch (error) {
        console.log('sortingHandler err', error);
      }
    };

    const handleSorting = (name, sortOptionBool) => {
      setIsSortingType(name);
      setSortOption({
        ...false,
        [sortOptionBool]: !sortOption[`${sortOptionBool}`],
      });
      setIsSorted(true);
      setIsBottomModalOpen(false);
      sortingHandler();
    };

    useEffect(() => {
      sortingHandler();
    }, [sortedFields.sortType]);

    const newProducts = products.filter(
      product => product.tags.includes('new') || product.tags.includes('isNew'),
    );

    const saleProducts = products.filter(product =>
      product.tags.includes('sale'),
    );

    const finalProducts =
      categoryName === 'New' ? newProducts : isOnSale ? saleProducts : products;

    const numberOfColums = isListView ? 1 : 2;

    const handleProductCard = item => {
      navigation.navigate('SingleProductScreen', {
        product: item,
        products: products,
      });
    };
    const result = isFiltered
      ? filteredProducts
      : isSorted
      ? sortedProducts
      : finalProducts;

    console.log('isSorted', isSorted);
    console.log('result', result);
    console.log('sorted products', sortedProducts);

    return (
      <View style={styles.container}>
        <StatusBar />
        <Text fontWeight={'bold'} style={styles.title}>
          {isOnSale ? 'Sale' : name}
        </Text>
        <View style={styles.filters}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() =>
              navigation.navigate('FiltersScreen', {
                finalProducts: finalProducts,
              })
            }>
            <MaterialIcons name="filter" width={20} height={20} />
            <Text>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              isFiltered
                ? Alert.alert(
                    'Sorry',
                    'You can not sort products after filtering',
                  )
                : setIsBottomModalOpen(!isBottomModalOpen);
            }}>
            <AntDesign name="right" width={20} height={20} />
            <Text>{isSortingType}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => setIsListView(!isListView)}>
            {isListView ? (
              <MaterialIcons name="list" width={20} height={20} />
            ) : (
              <AntDesign name="creditcard" width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
        {finalProducts.length === 0 ? (
          <Text style={{fontSize: 16.6, color: theme.colors.SALE}}>
            Sorry, You don't have any products in {`${categoryName}`} yet!
          </Text>
        ) : filteredProducts !== undefined && filteredProducts.length === 0 ? (
          <Text style={{fontSize: 16.6, color: theme.colors.SALE}}>
            Sorry, You don't have any products by this filtering
          </Text>
        ) : (
          <FlatList
            data={result}
            numColumns={numberOfColums}
            columnWrapperStyle={
              isListView ? null : {justifyContent: 'space-around'}
            }
            key={numberOfColums}
            renderItem={({item}) => (
              <ProductCard
                product={item}
                isInCatalog={true}
                isRowView={isListView}
                isOnSale={isOnSale}
                onPress={() => handleProductCard(item)}
              />
            )}
            keyExtractor={item => item.name}
          />
        )}
        {isBottomModalOpen ? (
          <SortByModal name={'SortBy'} height={250}>
            <View style={styles.sortBy}>
              <FlatList
                data={sortOptions}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.sortingContainer,
                      {
                        backgroundColor: sortOption[`${item.sortOptionBool}`]
                          ? theme.colors.primary
                          : null,
                      },
                    ]}
                    onPress={() => {
                      handleSorting(item.sortingName, item.sortOptionBool);
                    }}>
                    <Text fontWeight={'medium'} style={styles.sortingName}>
                      {item.sortingName}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.sortingName}
              />
            </View>
          </SortByModal>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: theme.colors.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  title: {
    color: theme.colors.TEXT,
    fontSize: 34,
    lineHeight: 34,
    marginBottom: 20,
  },
  btn: {
    margin: 10,
  },
  filters: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btns: {
    height: 70,
    width: '100%',
  },
  sortBy: {
    width: '100%',
    marginTop: 70,
  },
  sortingName: {
    fontSize: 18,
    lineHeight: 18,
  },
  sortingContainer: {
    width: '100%',
    padding: 16,
    alignItems: 'flex-start',
  },
});

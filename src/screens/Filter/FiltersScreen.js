import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import {theme} from '../../common/theme';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {ColorContainer} from '../../components/ColorContainer';
import {SizeContainer} from '../../components/SizeContainer';

export const Filters = ({navigation, route}) => {
  const {finalProducts} = route.params;
  const [colors, setColors] = useState([
    {
      color: 'black',
      state: false,
    },
    {
      color: 'white',
      state: false,
    },
    {
      color: 'silver',
      state: false,
    },
    {
      color: 'gold',
      state: false,
    },
    {
      color: 'red',
      state: false,
    },
    {
      color: 'tan',
      state: false,
    },
    {
      color: 'pink',
      state: false,
    },
    {
      color: 'khaki',
      state: false,
    },
    {
      color: 'grey',
      state: false,
    },
    {
      color: 'green',
      state: false,
    },
    {
      color: 'yellow',
      state: false,
    },
    {
      color: 'blue',
      state: false,
    },
    {
      color: 'orange',
      state: false,
    },
  ]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilteredProducts, setIsFilteredProducts] = useState(false);
  const [sizes, setSizes] = useState([
    {
      size: 'XS',
      state: false,
    },
    {
      size: 'S',
      state: false,
    },
    {
      size: 'M',
      state: false,
    },
    {
      size: 'L',
      state: false,
    },
    {
      size: 'XL',
      state: false,
    },
  ]);
  const [values, setValues] = useState([0, 100]);

  const multiSliderValuesChange = values => {
    setValues(values);
    let products = isFilteredProducts ? filteredProducts : finalProducts;

    const filteredProductsByPrice = products.filter(product => {
      if (product.price < values[1] && values[0] < product.price)
        return product;
    });
    setFilteredProducts(filteredProductsByPrice);
    setIsFilteredProducts(true);
  };
  const handleSize = (size, state, index) => {
    let updatedSizes = [...sizes];
    updatedSizes[index] = {
      size: size,
      state: !state,
    };
    setSizes(updatedSizes);
    let products = isFilteredProducts ? filteredProducts : finalProducts;

    const filteredProductsBySize = products.filter(product => {
      const s = product.sizes.filter(item => {
        console.log('color', item.size);
        return item.size === size;
      });

      return product.sizes.includes(s[0]);
    });
    setFilteredProducts(filteredProductsBySize);
    setIsFilteredProducts(true);
  };
  const handleColor = (color, state, index) => {
    let updatedColors = [...colors];
    updatedColors[index] = {
      color: color,
      state: !state,
    };
    setColors(updatedColors);
    let products = isFilteredProducts ? filteredProducts : finalProducts;
    const filteredProductsByColor = products.filter(product => {
      const col = product.colors.filter(item => {
        return item.color === color;
      });
      return product.colors.includes(col[0]);
    });
    setFilteredProducts(filteredProductsByColor);
    setIsFilteredProducts(true);
  };
  const handleFilter = () => {
    navigation.navigate('Catalog', {
      filteredProducts:
        filteredProducts.length === 0 ? finalProducts : filteredProducts,
      isFiltered: true,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.bodyPart}>
        <View style={styles.titleContainer}>
          <Text weight={'medium'} style={styles.title}>
            Price Range{' '}
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Text style={[styles.title, {position: 'absolute', left: 0}]}>
            ${values[0]}
          </Text>
          <Text style={[styles.title, {position: 'absolute', right: 0}]}>
            ${values[1]}
          </Text>
          <MultiSlider
            values={[values[0], values[1]]}
            sliderLength={300}
            onValuesChange={multiSliderValuesChange}
            min={0}
            max={500}
            step={1}
          />
        </View>
      </View>

      <View style={styles.bodyPart}>
        <View style={styles.titleContainer}>
          <Text weight={'medium'} style={styles.title}>
            Colors{' '}
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <FlatList
            horizontal={true}
            data={colors}
            renderItem={({item, index}) => (
              <ColorContainer
                onPress={() => {
                  handleColor(item.color, item.state, index);
                }}
                bgColor={item.color}
                borderColor={
                  item.state ? theme.colors.primary : theme.colors.TEXT
                }
              />
            )}
            keyExtractor={item => item.color}
          />
        </View>
      </View>
      <View style={styles.bodyPart}>
        <View style={styles.titleContainer}>
          <Text weight={'medium'} style={styles.title}>
            Sizes{' '}
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <FlatList
            horizontal={true}
            data={sizes}
            renderItem={({item, index}) => (
              <SizeContainer
                onPress={() => handleSize(item.size, item.state, index)}
                bgColor={item.state ? theme.colors.primary : null}
                borderWidth={item.state ? 0 : 0.4}
                name={item.size}
                width={40}
              />
            )}
            keyExtractor={item => item.size}
          />
        </View>
      </View>

      <TouchableOpacity
        onPressApply={() => handleFilter()}
        onPressDiscard={() => navigation.navigate('Catalog')}
      />
      <TouchableOpacity
        onPressApply={() => handleFilter()}
        onPressDiscard={() => navigation.navigate('Catalog')}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.BACKGROUND,
  },
  titleContainer: {
    width: '100%',
    height: 20,
    padding: 20,
  },
  bodyPart: {
    width: '100%',
    height: 120,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.TEXT,
    fontSize: 16,
    lineHeight: 20,
  },
  sliderContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },

  rightIcon: {
    position: 'absolute',
    right: -160,
    top: -26,
  },
});

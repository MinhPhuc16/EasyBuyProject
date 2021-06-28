import React, {useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import {theme} from '../../common/theme';
import {GLOBAL_STYLES} from '../../common/globalStyles';
import {SaleSlogan} from '../../components/SaleSlogan';
import {Category} from '../../components/Category';

export const Categories = ({navigation}) => {
  const categoriesWoman = [
    {
      categoryName: 'New',
      imageSrc:
        'https://images.unsplash.com/photo-1525845859779-54d477ff291f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    },
    {
      categoryName: 'Clothes',
      imageSrc:
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
    },
    {
      categoryName: 'Shoes',
      imageSrc:
        'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    },
    {
      categoryName: 'Bags',
      imageSrc:
        'https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    },
  ];
  const categoriesMan = [
    {
      categoryName: 'New',
      imageSrc:
        'https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    },
    {
      categoryName: 'Clothes',
      imageSrc:
        'https://image.thanhnien.vn/1024/uploaded/trangpth/2021_01_25/rose_qnem.jpg',
    },
    {
      categoryName: 'Shoes',
      imageSrc:
        'https://image.thanhnien.vn/1024/uploaded/trangpth/2021_01_25/rose_qnem.jpg',
    },
    {
      categoryName: 'Bags',
      imageSrc:
        'https://image.thanhnien.vn/1024/uploaded/trangpth/2021_01_25/rose_qnem.jpg',
    },
  ];

  const [isWomanClicked, setIsWomanClicked] = useState(true);
  const handleCategory = type => {
    if (type === 'men') {
      setIsWomanClicked(false);
    } else if (type === 'women') {
      setIsWomanClicked(true);
    }
  };
  const handleSaleSlogan = () => {
    navigation.navigate('CategoriesOf', {
      isOnSale: true,
      isWomanClicked: isWomanClicked,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.btns}>
        <TouchableOpacity
          style={[styles.btn, {borderBottomWidth: isWomanClicked ? 4 : 0}]}
          onPress={() => handleCategory('women')}>
          <Text
            style={{
              color: isWomanClicked ? theme.colors.TEXT : theme.colors.GRAY,
              fontSize: 20,
            }}>
            Women
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {borderBottomWidth: !isWomanClicked ? 4 : 0}]}
          onPress={() => handleCategory('men')}>
          <Text
            style={{
              color: !isWomanClicked ? theme.colors.TEXT : theme.colors.GRAY,
              fontSize: 20,
            }}>
            Men
          </Text>
        </TouchableOpacity>
      </View>
      <SaleSlogan discount={50} onPress={() => handleSaleSlogan()} />
      <FlatList
        data={isWomanClicked ? categoriesWoman : categoriesMan}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Category
              categoryName={item.categoryName}
              imageSrc={item.imageSrc}
              onPress={() =>
                navigation.navigate('CategoriesOf', {
                  isWomanClicked: isWomanClicked,
                  categoryName: item.categoryName,
                })
              }
            />
          </View>
        )}
        keyExtractor={item => item.categoryName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.BACKGROUND,
    paddingTop: 10,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    color: theme.colors.TEXT,
    fontSize: 30,
    lineHeight: 28,
    margin: 10,
    marginLeft: 55,
    marginRight: 75,
  },
  backIcon: {
    marginTop: 10,
  },
  card: {
    marginTop: 20,
    marginBottom: 10,
  },
  cards: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  btns: {
    flexDirection: 'row',
    marginBottom: GLOBAL_STYLES.MARGIN_LEFT,
  },
  btn: {
    width: 180,
    height: 35,
    alignItems: 'center',
    borderColor: theme.colors.p,
  },
});

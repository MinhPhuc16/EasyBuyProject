import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import {theme} from '../common/theme';

export const Category = ({categoryName, imageSrc, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.categoryContainer}>
        <View style={styles.categoryTextContainer}>
          <Text fontWeight={'bold'} style={styles.categoryText}>
            {categoryName}
          </Text>
        </View>
        <Image style={styles.categoryImage} source={{uri: imageSrc}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    height: 100,
    width: '100%',
    backgroundColor: theme.colors.BACKGROUND,
    borderRadius: 7,
    position: 'relative',
  },
  categoryText: {
    fontSize: 18,
    lineHeight: 22,
  },
  categoryTextContainer: {
    height: 100,
    width: 165,
    paddingTop: 40,
    paddingLeft: 25,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },

  categoryImage: {
    height: 100,
    width: 165,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
  },
});

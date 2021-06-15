import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Text} from 'react-native';
import {theme} from '../common/theme';

export const SaleSlogan = ({discount, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text weight={'bold'} style={styles.title}>
          SUMMER SALES
        </Text>
        <Text style={styles.text}>Up to {discount}% off</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
  },
  text: {
    fontSize: 18,
  },
});

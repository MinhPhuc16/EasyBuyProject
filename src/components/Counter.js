import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {theme} from '../common/theme';

export const Counter = ({count, handleMinus, handlePlus}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMinus}>
        <Text> + </Text>
      </TouchableOpacity>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <TouchableOpacity onPress={handlePlus}>
        <Text> - </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  count: {
    fontSize: 18,
    color: theme.colors.TEXT,
  },
  countContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

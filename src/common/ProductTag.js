import React from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from '../common/theme';

export const ProductTag = ({title = 'New', style}) => {
  return (
    <View style={{...styles.container, ...style}}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 24,
    borderRadius: 29,
    backgroundColor: theme.colors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 11,
  },
});

import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export const SizeContainer = ({width, name, onPress, bgColor, borderWidth}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {width: width, backgroundColor: bgColor, borderWidth: borderWidth},
      ]}
      onPress={onPress}>
      <Text style={styles.containerText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    borderColor: '#ABB4BD',
    margin: 10,
  },
  containerText: {
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
  },
});

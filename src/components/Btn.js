import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export const Btn = ({
  btnName,
  bgColor,
  height,
  width,
  borderColor,
  borderWidth,
  titleStyle,
  containerStyle,
  onPress,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        containerStyle,
        {
          backgroundColor: bgColor,
          height: height,
          width: width,
          borderWidth: borderWidth,
          borderColor: borderColor,
        },
      ]}
      onPress={onPress}
      rest={rest}>
      <Text weight={'medium'} style={{...styles.btnText, ...titleStyle}}>
        {btnName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

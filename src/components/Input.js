import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {theme} from '../common/theme';

export const Input = ({
  name,
  style,
  secureTextEntry,
  onChangeHandler,
  value,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{name}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        weight={'medium'}
        style={{...styles.inputText, ...style}}
        onChangeText={value => onChangeHandler(value)}
        value={value}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 70,
    width: '100%',
    paddingTop: 15,
    paddingLeft: 25,
    backgroundColor: theme.colors.DARK,
    borderRadius: 4,
    marginBottom: 20,
  },
  inputLabel: {
    color: theme.colors.GRAY,
    fontSize: 13,
    lineHeight: 13,
  },
  inputText: {
    color: theme.colors.TEXT,
    fontSize: 14,
    lineHeight: 20,
  },
});

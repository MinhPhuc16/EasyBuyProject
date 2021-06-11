import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {theme} from '../../common/theme';

export const AddressCard = ({
  fullName = 'Xuan Quynh',
  address = 'Hoang Dao Thuy',
  city = 'Hanoi',
  state = 'Hanoi',
  zipCode = 'XQ0203',
  country = 'Vietnam',
  editPressHandler,
  changePressHandler,
  isSelected,
  onPress,
  isInCheckout = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>{fullName}</Text>

        {isInCheckout ? (
          <TouchableOpacity onPress={changePressHandler}>
            <Text style={styles.edit} weight="bold">
              Change{' '}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={editPressHandler}>
            <Text style={styles.edit} weight="bold">
              Edit
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text>{address}</Text>
      <Text>
        {city}, {state} {zipCode}, {country}
      </Text>
      {isInCheckout ? null : (
        <TouchableOpacity style={styles.checkboxWrapper} onPress={onPress}>
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: isSelected ? theme.colors.TEXT : null,
                borderColor: isSelected ? null : theme.colors.GRAY,
                borderWidth: isSelected ? null : 2,
              },
            ]}></View>
          <Text>Use as the shipping address</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
    backgroundColor: theme.colors.DARK,
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  checkboxWrapper: {
    flexDirection: 'row',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  edit: {
    color: theme.colors.primary,
  },
});

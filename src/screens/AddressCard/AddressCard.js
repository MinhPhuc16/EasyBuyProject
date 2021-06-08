import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {CustomText} from '../../components/CustomText';
import {COLORS} from '../style/colors';
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
        <CustomText weight="medium">{fullName}</CustomText>

        {isInCheckout ? (
          <TouchableOpacity onPress={changePressHandler}>
            <CustomText style={styles.edit} weight="bold">
              Change{' '}
            </CustomText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={editPressHandler}>
            <CustomText style={styles.edit} weight="bold">
              Edit
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      <CustomText>{address}</CustomText>
      <CustomText>
        {city}, {state} {zipCode}, {country}
      </CustomText>
      {isInCheckout ? null : (
        <TouchableOpacity style={styles.checkboxWrapper} onPress={onPress}>
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: isSelected ? theme.colors.TEXT : null,
                borderColor: isSelected ? null : COLORS.GRAY,
                borderWidth: isSelected ? null : 2,
              },
            ]}></View>
          <CustomText>Use as the shipping address</CustomText>
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
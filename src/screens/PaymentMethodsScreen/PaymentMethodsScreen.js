import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {theme} from '../../common/theme';
import {Picker} from '@react-native-picker/picker';

const PaymentMethodsScreen = () => {
  const DATA = [
    {
      id: '9',
      title: 'Cash',
      selected: false,
    },
    {
      id: '10',
      title: 'Airpay',
      selected: true,
    },
    {
      id: '11',
      title: 'Momo',
      selected: false,
    },
    {
      id: '12',
      title: 'VNPay',
      selected: false,
    },
    {
      id: '13',
      title: 'ViettelPay',
      selected: false,
    },
    {
      id: '14',
      title: 'VinaPay',
      selected: false,
    },
  ];
  return (
    <View style={styles.container}>
      <Picker
        style={styles.pickerStyle}
        data={DATA}
        optionStyle={styles.optionStyle}
        selectedOptionStyle={styles.selectedOptionStyle}
        optionTextStyle={styles.optionTextStyle}
        selectedOptionTextStyle={styles.selectedOptionTextStyle}
      />
      <View>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            backgroundColor: theme.colors.DARK,
          }}
          onPress={() =>
            navigation.navigate('AddPayCardScreen')
          }></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  optionStyle: {
    margin: 5,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#E9EFFE',
    fontFamily: 'Helevica Neue',
  },
  selectedOptionStyle: {
    margin: 5,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#497DF9',
    fontFamily: 'Helevica Neue',
  },
  optionTextStyle: {
    color: '#497DF9',
  },
  selectedOptionTextStyle: {
    color: '#ffffff',
  },
});

export default PaymentMethodsScreen;

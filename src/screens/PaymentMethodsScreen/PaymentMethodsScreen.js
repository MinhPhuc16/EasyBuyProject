import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {theme} from '../../common/theme';
import {Picker} from '@react-native-picker/picker';

const PaymentMethodsScreen = ({navigation}) => {
  const [selectedPayment, setSelectedPayment] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text1}>Choose your Payment</Text>
        <Picker
          selectedValue={selectedPayment}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedPayment(itemValue)
          }>
          <Picker.Item label="Cash" value="cash" />
          <Picker.Item label="Momo" value="momo" />
          <Picker.Item label="Visa" value="visa" />
          <Picker.Item label="Airpay" value="airpay" />
          <Picker.Item label="VNPay" value="vnpay" />
          <Picker.Item label="ViettelPay" value="viettelpay" />
        </Picker>
      </View>
      <View style={styles.Done}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.text}> Done </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: theme.colors.GRAY,
  },
  Done: {
    height: 50,
    width: '80%',
    backgroundColor: theme.colors.primary,

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 300,
    borderRadius: 30,
  },
  text: {
    fontSize: 22,
    fontWeight: 'normal',
    alignSelf: 'center',
  },
  text1: {
    fontSize: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default PaymentMethodsScreen;

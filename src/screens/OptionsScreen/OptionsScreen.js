import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {logoutUser} from '../../api/auth';

export default function OptionsScreen({navigation}) {
  return (
    <LinearGradient colors={('ff7f00', '#ffaf65')}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.components}
          onPress={() => navigation.navigate('MyOrders')}>
          <Text style={styles.text}> MyOrders </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.components}
          onPress={() => navigation.navigate('PaymentMethodsScreen')}>
          <Text style={styles.text}> Payment Methods </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.components}
          onPress={() => navigation.navigate('ShippingAddressesScreen')}>
          <Text style={styles.text}> Shipping Addresses </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.components}
          onPress={() => navigation.navigate('LanguageScreen')}>
          <Text style={styles.text}> Language </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.components} onPress={logoutUser}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  components: {
    marginTop: 15,
    marginLeft: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
  },
});

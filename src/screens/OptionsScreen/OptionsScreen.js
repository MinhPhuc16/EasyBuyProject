import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {logoutUser} from '../../api/auth';

export default function OptionsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffaf65', '#e5e5e5']}
        style={styles.linearGradient}>
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
        <TouchableOpacity
          style={styles.components}
          onPress={() => navigation.navigate('EditProfileScreen')}>
          <Text style={styles.text}> EditProfile </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.components} onPress={logoutUser}>
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  components: {
    marginTop: 50,
    marginLeft: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  },
});

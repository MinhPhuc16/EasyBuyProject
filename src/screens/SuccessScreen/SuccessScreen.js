import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {GLOBAL_STYLES} from '../../common/globalStyles';
import {theme} from '../../common/theme';
import {Btn} from '../components/Btn';

export const SuccessScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/shopping-cart_1.png')}
        style={styles.bagImg}
      />
      <Text style={{fontSize: 34, paddingBottom: 20}} weight="bold">
        Success!
      </Text>
      <Text>Your order will be delivered soon.</Text>
      <Text>Thank you for choosing our app!</Text>
      <Btn
        height={50}
        width={'100%'}
        bgColor={theme.colors.primary}
        btnName="CONTINUE SHOPPING"
        containerStyle={{marginTop: 25}}
        onPress={() => navigation.navigate('HomeScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bagImg: {
    width: 208,
    height: 213,
    marginBottom: 35,
    marginTop: 60,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
});

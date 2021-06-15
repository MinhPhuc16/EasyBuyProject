import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {theme} from '../common/theme';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Group_12.png')}
        style={styles.background}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  background: {
    backgroundColor: theme.colors.surface,
    height: 300,
    width: '100%',
  },
});

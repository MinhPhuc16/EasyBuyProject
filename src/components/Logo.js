import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {theme} from '../common/theme';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Group_3.png')}
        resizeMode="repeat"
        style={styles.background}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '42%',
    backgroundColor: theme.colors.surface,
  },
});

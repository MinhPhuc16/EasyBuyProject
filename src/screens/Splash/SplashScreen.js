import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {View, StyleSheet, ImageBackground} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SplashScreen = ({navigation}) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      navigation.navigate('BottomTabs');
    } else {
      navigation.navigate('LogInScreen');
    }
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('../../assets/images/Group_5.png')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
  },
});

export default SplashScreen;

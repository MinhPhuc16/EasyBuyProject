import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {logoutUser} from '../../api/auth';

export default function OptionsScreen() {
  return (
    <View style={styles.container}>
      <Text> Hello </Text>
      <TouchableOpacity onPress={logoutUser}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

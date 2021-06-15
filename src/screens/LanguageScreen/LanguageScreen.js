import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {theme} from '../../common/theme';

const LanguageScreen = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.description}> Country/Language</Text>
      <Text style={styles.description}>
        {' '}
        You are shopping for EasyBuy items{' '}
      </Text>
      <Text style={styles.description}>
        {' '}
        Which language do you want to shop in?{' '}
      </Text>
      <View style={styles.box}>
        <Text style={styles.text1}>Choose your Language</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Vietnamese" value="vietnamese" />
          <Picker.Item label="Spainish" value="spainish" />
          <Picker.Item label="Portugese" value="vietnamese" />
          <Picker.Item label="English" value="english" />
          <Picker.Item label="French" value="french" />
          <Picker.Item label="Thailand" value="french" />
        </Picker>
      </View>

      <View style={styles.Done}>
        <TouchableOpacity onPress={() => navigation.navigate('OptionsScreen')}>
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
export default LanguageScreen;

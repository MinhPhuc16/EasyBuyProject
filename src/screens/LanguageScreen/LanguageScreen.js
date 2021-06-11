import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {theme} from '../../common/theme';
import RNPickerSelect from 'react-native-picker-select';

const LanguageScreen = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.Language}>Country/Language</Text>
      <Text style={styles.description}>
        {' '}
        You are shopping for EasyBuy items{' '}
      </Text>
      <Text style={styles.description}>
        {' '}
        Which language and currency do you want to shop in?{' '}
      </Text>
      <View style={styles.box}>
        <Text>Choose your Language</Text>
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
        </Picker>
      </View>
      <View style={styles.box}>
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCurrency(itemValue)
          }>
          <Picker.Item label="VND" value="vietnamese" />
          <Picker.Item label="Dollar" value="dollar" />
          <Picker.Item label="Euro" value="euro" />
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
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 300,
  },
  text: {
    fontSize: 22,
    fontWeight: 'normal',
    alignSelf: 'center',
  },
});
export default LanguageScreen;

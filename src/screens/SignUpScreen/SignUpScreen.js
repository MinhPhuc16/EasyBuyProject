import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {signUpUser} from '../../api/auth';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import {theme} from '../../common/theme';
import Toast from '../../components/Toast';
import {emailValidator} from '../../validator/emailValidator';
import {passwordValidator} from '../../validator/passwordValidator';
import {nameValidator} from '../../validator/nameValidator';
import firestore from '@react-native-firebase/firestore';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import RadioGroup from 'react-native-radio-buttons-group';
const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Male',
    value: 'male',
  },
  {
    id: '2',
    label: 'Female',
    value: 'female',
  },
];

export default function SignUpScreen({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  const usersCollectionRef = firestore().collection('Users');

  const adduser = () => {
    usersCollectionRef.add({
      name: name,
      password: password,
      email: email,
    });
  };

  const SignUp = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    setLoading(true);
    const response = await signUpUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    if (response.error) {
      setError(response.error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Header> Create account, </Header>
      <Text style={styles.text}> Sign in to get started </Text>
      <TextInput
        placeholder="Name"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        placeholder="Email"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Text> Gender: </Text>
      <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
      <TouchableOpacity loading={loading} onPress={adduser} onPressIn={SignUp}>
        <Text> SignUp </Text>
      </TouchableOpacity>
      <View style={styles.Alreadyhaveaccount}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LogInScreen')}>
          <Text style={styles.link}>LogIn</Text>
        </TouchableOpacity>
      </View>
      <Toast message={error} onDismiss={() => setError('')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Alreadyhaveaccount: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

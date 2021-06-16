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
import {theme} from '../../common/theme';
import Toast from '../../components/Toast';
import {emailValidator} from '../../validator/emailValidator';
import {passwordValidator} from '../../validator/passwordValidator';
import {nameValidator} from '../../validator/nameValidator';
import firestore from '@react-native-firebase/firestore';

export default function SignUpScreen({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

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
    // if (response.error) {
    //   setError(response.error);
    // } else {
    //   navigation.navigate('BottomTabs');
    // }
    // setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.header}> Create account</Text>
      <Text style={styles.text}> Sign in to get started </Text>
      <View style={styles.TextInput}>
        <TextInput
          style={styles.input}
          placeholder="    Name"
          value={name.value}
          onChangeText={text => setName({value: text, error: ''})}
          error={!!name.error}
          errorText={name.error}
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          style={styles.input}
          placeholder="    Email"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          style={styles.input}
          placeholder="    Password"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>

      <TouchableOpacity loading={loading} onPress={SignUp}>
        <View style={styles.login}>
          <Text style={styles.loginText}> SignUp </Text>
        </View>
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
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  text: {
    fontSize: 20,
    color: theme.colors.TEXT,
    marginLeft: 10,
  },
  header: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  TextInput: {
    height: 30,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
  },
  input: {
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  gender: {
    marginLeft: 18,
    fontSize: 20,
  },
  login: {
    height: 40,
    width: '80%',
    alignSelf: 'center',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'normal',
  },
});

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import {loginUser} from '../../../api/auth';
import Logo from '../../../components/Logo';
import Header from '../../../components/Header';
import {theme} from '../../../common/theme';
import Toast from '../../../components/Toast';
import {emailValidator} from '../../../validator/emailValidator';
import {passwordValidator} from '../../../validator/passwordValidator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LogInScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: ''});
  const [password, setPassword] = useState({value: ''});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '171244469665-5i55b7s12igrm3f6a8h9ffthige7c01p.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const LogIn = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    setLoading(true);
    const response = await loginUser({
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
      <Header>Welcome, </Header>
      <Text style={styles.text}> Sign in to continue </Text>
      <View style={styles.TextInput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.TextInput}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>

      <View style={styles.forgotPassword}>
        <MaterialIcons name="lock" height={20} width={20} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        loading={loading}
        mode="contained"
        onPress={LogIn}
        onPressIn={() => navigation.navigate('BottomTabs')}>
        <Text> Login </Text>
      </TouchableOpacity>
      <View style={styles.Donthaveaccount}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUpScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Toast message={error} onDismiss={() => setError('')} />
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <GoogleSigninButton
            style={{width: 250, height: 60}}
            size={GoogleSigninButton.Size.Wide}
            onPress={_signIn}
            onPressIn={navigation.navigate('BottomTabs')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 30,
    flexDirection: 'row',
  },
  Donthaveaccount: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 12,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  TextInput: {
    height: 30,
    width: 85,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default LogInScreen;

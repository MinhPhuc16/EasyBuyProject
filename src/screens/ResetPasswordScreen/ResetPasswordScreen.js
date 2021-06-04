import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import {emailValidator} from '../../validator/emailValidator';
import Toast from '../../components/Toast';
import {sendEmailWithPassword} from '../../api/auth';

export default function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({value: '', type: ''});

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    setLoading(true);
    const response = await sendEmailWithPassword(email.value);
    if (response.error) {
      setToast({type: 'error', message: response.error});
    } else {
      setToast({
        type: 'success',
        message: 'Email with password has been sent.',
      });
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Logo />
      <Header> Reset your Password. </Header>
      <TextInput
        style={styles.input}
        placeholder="E-mail address"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <TouchableOpacity
        loading={loading}
        onPress={sendResetPasswordEmail}
        style={{marginTop: 16}}>
        <Text>Send Instructions</Text>
      </TouchableOpacity>
      <Toast {...toast} onDismiss={() => setToast({value: '', type: ''})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
  },
});

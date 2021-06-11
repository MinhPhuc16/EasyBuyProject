import React, {useState} from 'react';
import {Input} from '../../components/Input';
import {View, StyleSheet, ScrollView} from 'react-native';
import {GLOBAL_STYLES} from '../../common/globalStyles';
import {theme} from '../../common/theme';
import {Btn} from '../../components/Btn';
import {saveShippingAddress} from '../../api/auth';

export const AddingShippingAddress = ({route, navigation}) => {
  const [addressFields, setAddressFields] = useState(
    route.params?.address || {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  );
  const isEditPressed = route.params?.isEditPressed || false;
  const handleFieldChange = (name, value) => {
    setAddressFields(fields => ({
      ...fields,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Input
          name="Full name"
          value={addressFields.fullName}
          onChangeText={v => handleFieldChange('fullName', v)}
        />
        <Input
          name="Address"
          value={addressFields.address}
          onChangeText={v => handleFieldChange('address', v)}
        />
        <Input
          name="City"
          value={addressFields.city}
          onChangeText={v => handleFieldChange('city', v)}
        />
        <Input
          name="State/Province/Region"
          value={addressFields.state}
          onChangeText={v => handleFieldChange('state', v)}
        />
        <Input
          name="Zip code (Postal code)"
          value={addressFields.zipCode}
          onChangeText={v => handleFieldChange('zipCode', v)}
        />
        <Input
          name="Country"
          value={addressFields.country}
          onChangeText={v => handleFieldChange('country', v)}
        />

        <Btn
          btnName="SAVE ADDRESS"
          bgColor={theme.colors.primary}
          width="100%"
          height={48}
          onPress={() => {
            saveShippingAddress(
              addressFields,
              isEditPressed,
              route.params?.index,
            );
            navigation.navigate('ShippingAddressesScreen');
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.BACKGROUND,
    padding: GLOBAL_STYLES.PADDING,
  },
});

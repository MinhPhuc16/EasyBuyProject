import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {AddressCard} from '../AddressCard/AddressCard';
import {theme} from '../../common/theme';
import {GLOBAL_STYLES} from '../../common/globalStyles';
import {connect} from 'react-redux';
import {selectCurrentUserShippingAddresses} from '../../store/users';
import {selectShippingAddress} from '../../api/auth';

const mapStateToProps = state => ({
  shippingAddresses: selectCurrentUserShippingAddresses(state),
});

export const ShippingAddressesScreen = connect(
  mapStateToProps,
  null,
)(({navigation, shippingAddresses}) => {
  return (
    <View style={styles.container}>
      {shippingAddresses.length !== 0 ? (
        <FlatList
          data={shippingAddresses}
          renderItem={({item, index}) => (
            <AddressCard
              fullName={item.fullName}
              address={item.address}
              city={item.city}
              state={item.state}
              zipCode={item.zipCode}
              country={item.country}
              isSelected={item.isSelected}
              onPress={() => selectShippingAddress(index)}
              editPressHandler={() =>
                navigation.navigate('AddingShippingAddress', {
                  address: item,
                  isEditPressed: true,
                  index: index,
                })
              }
            />
          )}
        />
      ) : (
        <Text> You have not added any shipping addresses yet </Text>
      )}

      <Image
        source={require('../../assets/images/Rose_2.png')}
        style={{alignSelf: 'flex-end', backgroundColor: theme.colors.DARK}}
        onPress={() => navigation.navigate('AddingShippingAddress')}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.BACKGROUND,
    flex: 1,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    paddingVertical: 10,
  },
});

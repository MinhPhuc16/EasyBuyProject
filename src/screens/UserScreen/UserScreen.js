import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {theme} from '../../common/theme';
import {logoutUser} from '../../api/auth';
import {connect} from 'react-redux';
import {getCurrentUserData, selectUserData} from '../../store/users';
import {selectCurrentProduct} from '../../store/products';
import {GLOBAL_STYLES} from '../../common/globalStyles';
const mapStateToProps = state => ({
  user: selectUserData(state),
  product: selectCurrentProduct(state),
});

const ProfileScreen = connect(mapStateToProps, {
  getCurrentUserData,
  logoutUser,
})(({getCurrentUserData, navigation, user}) => {
  const handleGetCurrentUserData = async () => {
    try {
      await getCurrentUserData();
    } catch (error) {
      console.log('getNewData', error);
    }
  };

  useEffect(() => {
    handleGetCurrentUserData();
  }, []);

  const profileSections = [
    {
      sectionName: 'My Orders',
      dutyOfSection: `Already have ${user.orders.length} orders`,
      screenTo: 'MyOrders',
    },
    {
      sectionName: 'Shipping addresses',
      dutyOfSection: `${(user.shippingAddresses || []).length} addresses`,
      screenTo: 'ShippingAddressesScreen',
    },
    {
      sectionName: 'Payment methods',
      dutyOfSection: `${(user.paymentMethods || []).length} payment methods `,
      screenTo: 'PaymentMethods',
    },
    {
      sectionName: 'Settings',
      dutyOfSection: 'Change photo and username',
      screenTo: 'Settings',
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.logoutWrapper}>
        <Text weight={'bold'} style={styles.title}>
          My Profile
        </Text>
      </View>
      <View style={styles.userInfoSection}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/Rose_2.png')}
        />
        <View style={styles.text}>
          <Text weight={'bold'} style={styles.name}>
            {user.username}
          </Text>
          <Text weight={'medium'} style={styles.email}>
            {user.email}
          </Text>
        </View>
      </View>
      <FlatList
        data={profileSections}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.profileSection}
            key={`${item.sectionName}`}
            onPress={() => navigation.navigate(item.screenTo)}>
            <View style={styles.text}>
              <Text weight={'bold'} style={styles.sectionName}>
                {item.sectionName}
              </Text>
              <Text style={styles.sectionDesc}>{item.dutyOfSection}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.sectionName}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  title: {
    color: theme.colors.TEXT,
    fontSize: 34,
    marginVertical: 24,
  },
  email: {
    color: theme.colors.GRAY,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 15,
    marginLeft: 30,
  },
  name: {
    color: theme.colors.TEXT,
    fontSize: 20,
    lineHeight: 22,
    marginLeft: 30,
    marginBottom: 8,
  },

  sectionName: {
    color: theme.colors.TEXT,
    fontSize: 18,
    marginBottom: 8,
  },

  sectionDesc: {
    color: theme.colors.GRAY,
    fontSize: 14,
  },

  profileSection: {
    width: '100%',
    height: 72,
    borderBottomWidth: 0.5,
    borderColor: theme.colors.GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    marginTop: 10,
  },
  userInfoSection: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'white',
  },

  logoutWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
});

export default ProfileScreen;

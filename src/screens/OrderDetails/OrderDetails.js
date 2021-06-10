import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ScrollView,
  Text,
} from 'react-native';
import {Btn} from '../../components/Btn';
import {ProductCard} from '../../components/ProductCard';
import {GLOBAL_STYLES} from '../../common/globalStyles';
import {theme} from '../../common/theme';

export const OrderDetails = ({navigation, route}) => {
  const {
    quantity,
    trackingNo,
    orderNo,
    date,
    total,
    orderedProducts,
    deliveryMethod,
    paymentMethod,
  } = route.params;

  const orderInfo = [
    {
      infoTitle: 'Payment method:',
      infoText: `**** **** **** ${paymentMethod.cardNumber.slice(15, 19)}`,
    },
    {
      infoTitle: 'Delivery method:',
      infoText: `${deliveryMethod.deliveryMethodName}, 3 days,${deliveryMethod.deliveryMethodCost}$`,
    },
    {
      infoTitle: 'Discount:',
      infoText: `10%,Personal promo
         code`,
    },
    {
      infoTitle: 'Total Amount:',
      infoText: `${Math.floor(total)}$`,
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.orderNo}>Order №{orderNo}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={[styles.header, {justifyContent: 'flex-start'}]}>
          <Text style={styles.date}>Tracking number:</Text>
          <Text style={styles.orderNo}>{trackingNo}</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.orderNo}>{quantity} items</Text>
          <Text style={styles.status}>Delivered</Text>
        </View>
        <View style={styles.cards}>
          <FlatList
            data={orderedProducts}
            renderItem={({item}) => (
              <View style={styles.card}>
                <ProductCard
                  product={item}
                  isRowView={true}
                  isInOrders={true}
                />
              </View>
            )}
            keyExtractor={item => `${item.id - item.color}`}
          />
        </View>
        <Text style={styles.orderInfoTitle}>Order Information</Text>
        {orderInfo.map(item => (
          <View
            style={[styles.header, {justifyContent: 'flex-start'}]}
            key={item.infoText}>
            <View style={{width: 152}}>
              <Text style={styles.date}>{item.infoTitle}</Text>
            </View>
            <Text style={styles.orderNo}>{item.infoText}</Text>
          </View>
        ))}

        <View style={styles.btn}>
          <Btn
            width={160}
            height={40}
            borderColor={theme.colors.TEXT}
            borderWidth={1}
            btnName={'Reorder'}
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  date: {
    paddingRight: 10,
    color: theme.colors.GRAY,
    marginLeft: 18,
  },
  orderNo: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 18,
  },
  status: {
    color: theme.colors.success,
    lineHeight: 25,
    marginRight: 15,
  },

  cards: {
    width: '100%',
    display: 'flex',
  },
  orderInfoTitle: {
    fontSize: 19,
    lineHeight: 20,
    marginLeft: 18,
    marginTop: 18,
    marginBottom: 20,
  },
  btn: {
    width: 360,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
});

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {theme} from '../../common/theme';
import {Btn} from '../components/Btn';

export const Order = ({
  orderNo,
  trackingNo,
  quantity,
  total,
  date,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.firstPart}>
        <Text weight={'medium'} style={styles.orderNo}>
          Order №{orderNo}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={[styles.firstPart, {justifyContent: 'flex-start'}]}>
        <Text style={styles.date}>Tracking number:</Text>
        <Text weight={'medium'} style={styles.orderNo}>
          {trackingNo}
        </Text>
      </View>
      <View style={styles.firstPart}>
        <View style={[styles.firstPart, {justifyContent: 'flex-start'}]}>
          <Text style={styles.date}>Quantity:</Text>
          <Text weight={'medium'} style={styles.orderNo}>
            {quantity}
          </Text>
        </View>
        <View style={[styles.firstPart, {justifyContent: 'flex-start'}]}>
          <Text style={styles.date}>Total Amount:</Text>
          <Text weight={'medium'} style={styles.orderNo}>
            {Math.floor(total)}$
          </Text>
        </View>
      </View>
      <View style={styles.firstPart}>
        <Btn
          width={100}
          height={40}
          borderColor={colors.TEXT}
          borderWidth={1}
          btnName={'Details'}
          onPress={onPress}
        />
        <Text style={styles.status}>Delivered</Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 170,
    borderRadius: 8,
    backgroundColor: theme.colors.DARK,
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 7,
  },
  firstPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  date: {
    paddingRight: 10,
    color: theme.colors.GRAY,
  },
  orderNo: {
    fontSize: 16,
    lineHeight: 20,
  },
  status: {
    color: theme.colors.success,
    lineHeight: 35,
    marginRight: 15,
  },
});

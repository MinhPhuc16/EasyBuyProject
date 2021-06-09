import React from 'react';
import {View, StyleSheet, Image, TextInput, Text} from 'react-native';
import StarRating from 'react-native-star-rating';
import {theme} from '../../common/theme';

const defaultImgUrl = require('../../assets/images/Rose_2.png');

export const ReviewItem = ({
  username = 'Xuan Quynh',
  userImg = defaultImgUrl,
  rating = 4,
  date = new Date().getDate(),
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.userImg}
        source={{
          uri: userImg,
        }}
      />
      <Text style={styles.username} weight="medium">
        {username}
      </Text>
      <View style={styles.row}>
        <StarRating
          disabled={true}
          fullStarColor={theme.colors.STAR}
          starSize={14}
          starStyle={{margin: 3}}
          maxStars={5}
          rating={rating}
        />
        <Text style={styles.date}>
          {date} - {month} - {year}
        </Text>
      </View>

      <TextInput placeholder="Write your comment here" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.DARK,
    borderRadius: 8,
    width: Dimensions.get('window').width - 64,
    padding: 20,
    margin: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  username: {
    fontSize: 14,
  },
  userImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    position: 'absolute',
    left: -16,
    top: -16,
  },

  date: {
    fontSize: 11,
    color: theme.colors.GRAY,
  },
});

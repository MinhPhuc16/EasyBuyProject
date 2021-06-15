import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {theme} from '../common/theme';

export const SortByModal = ({name, children, height}) => {
  return (
    <View style={[styles.container, {height: height || 400}]}>
      <View style={styles.headerContainer}>
        <View style={styles.line} />
        <Text fontWeight={'bold'} style={styles.title}>
          {name}{' '}
        </Text>
      </View>
      <View style={styles.bodyContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.BACKGROUND,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
  },
  bodyContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
  },
  line: {
    width: 70,
    height: 6,
    backgroundColor: theme.colors.TEXT,
    marginBottom: 20,
    marginTop: 15,
    borderRadius: 10,
  },
  title: {
    color: theme.colors.TEXT,
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 10,
  },
});

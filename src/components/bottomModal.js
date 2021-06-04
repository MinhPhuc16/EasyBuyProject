import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';

import {theme} from '../../src/common/theme';

export const BottomModal = ({
  title,
  height,
  data,
  isClicked,
  isColor,
  handlePress,
  closeModal,
}) => {
  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={[styles.container, {height: height || 400, elevation: 5}]}>
        <View style={styles.headerContainer}>
          <View style={styles.line} />
          <Text fontWeight={'bold'} style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {data.map(name => (
              <View>
                <SizeContainer
                  bgColor={
                    isColor
                      ? name
                      : isClicked[`${name}`]
                      ? theme.colors.primary
                      : null
                  }
                  borderWidth={isColor ? 0 : isClicked[`${name}`] ? 0 : 0.4}
                  onPress={() => {
                    handlePress(name);
                    console.log(`${name} clicked`);
                  }}
                  name={name}
                  width={100}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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

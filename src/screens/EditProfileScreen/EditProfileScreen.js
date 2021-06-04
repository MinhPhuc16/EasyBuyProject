import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = () => {
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  };
  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/Group_9.png')}
      />
      <View style={styles.header}>
        <Text style={styles.text}> Hello </Text>
        <Image
          style={styles.logo}
          source={require('../../assets/images/user_1.png')}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.ProfilePictureText}> Profile Picture </Text>
        <Text style={styles.optional}> (optional) </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  image: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
});

export default EditProfileScreen;

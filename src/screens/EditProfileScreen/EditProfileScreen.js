import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {theme} from '../../common/theme';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';

const EditProfileScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const user = firebase.auth().currentUser;

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        fname: userData.fname,
        lname: userData.lname,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        userImg: imgUrl,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
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
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
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
  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/Group_9.png')}
      />
      <View style={styles.head}>
        <View style={styles.nameContainer}>
          <Text style={styles.text}> Hello, </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {userData ? userData.lname : ''}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('UserStack')}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/user.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.ProfilePictureText}> Profile Picture </Text>
        <Text style={styles.optional}> (optional) </Text>

        <BottomSheet
          ref={this.bs}
          snapPoints={[330, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
        />
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
          }}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={{
                    uri: image
                      ? image
                      : userData
                      ? userData.userImg ||
                        'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                      : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                  }}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contain}>
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color={theme.colors.secondary}
                size={25}
              />
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.fname : ''}
                onChangeText={txt => setUserData({...userData, fname: txt})}
                style={[
                  styles.textInput,
                  {
                    color: theme.colors.TEXT,
                  },
                ]}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color={theme.colors.secondary}
                size={25}
              />
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.lname : ''}
                onChangeText={txt => setUserData({...userData, lname: txt})}
                style={[
                  styles.textInput,
                  {
                    color: theme.colors.TEXT,
                  },
                ]}
              />
            </View>

            <View style={styles.action}>
              <FontAwesome
                name="phone"
                color={theme.colors.secondary}
                size={25}
              />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                autoCorrect={false}
                value={userData ? userData.phone : ''}
                onChangeText={txt => setUserData({...userData, phone: txt})}
                style={[
                  styles.textInput,
                  {
                    color: theme.colors.TEXT,
                  },
                ]}
              />
            </View>

            <View style={styles.action}>
              <FontAwesome
                name="globe"
                color={theme.colors.primary}
                size={25}
              />
              <TextInput
                placeholder="Country"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.country : ''}
                onChangeText={txt => setUserData({...userData, country: txt})}
                style={[
                  styles.textInput,
                  {
                    color: theme.colors.TEXT,
                  },
                ]}
              />
            </View>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                color={theme.colors.primary}
                size={20}
              />
              <TextInput
                placeholder="City"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={userData ? userData.city : ''}
                onChangeText={txt => setUserData({...userData, city: txt})}
                style={styles.textInput}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
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
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    height: 50,
  },
  ProfilePictureText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  optional: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 5,
  },
  body: {
    flex: 8,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 20,
  },
  image: {
    height: 60,
    marginTop: 50,
    alignSelf: 'center',
    position: 'relative',
    marginLeft: 20,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  contain: {
    marginTop: 20,
  },
});

export default EditProfileScreen;

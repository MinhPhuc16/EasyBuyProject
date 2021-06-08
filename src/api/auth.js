import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

export const logoutUser = () => {
  try {
    firebase.auth().signOut();
  } catch (e) {
    console.log(e.message);
  }
};

export const signUpUser = async ({name, email, password}) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({
      displayName: name,
    });
    return {user};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const loginUser = async ({email, password}) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return {user};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const sendEmailWithPassword = async email => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const saveShippingAddress = async (payload, isEdit, index) => {
  try {
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid);
    const userSnap = await userRef.get();
    const userData = userSnap.data();

    if (isEdit) {
      userData.shippingAddresses[index] = payload;
      userRef
        .set(
          {
            shippingAddresses: userData.shippingAddresses,
          },
          {merge: true},
        )
        .catch(error => {
          console.log(
            'Something went wrong with added shipping address to firestore: ',
            error,
          );
        });
    } else {
      userData.shippingAddresses.push({
        ...payload,
      });
      userRef
        .set(
          {
            shippingAddresses: userData.shippingAddresses,
          },
          {merge: true},
        )
        .catch(error => {
          console.log(
            'Something went wrong with added shipping address to firestore: ',
            error,
          );
        });
    }
  } catch (error) {
    console.log('saveShippingAddress error', error);
  }
};

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

export const MODULE_NAME = 'users';
export const selectUserData = state => state[MODULE_NAME].usersData;
export const selectCurrentUserShippingAddresses = state =>
  state[MODULE_NAME].usersData.shippingAddresses;

const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = payload => ({
  type: SET_CURRENT_USER,
  payload,
});

const initialState = {
  usersData: {},
};

export function usersReducer(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        usersData: payload,
      };
    default:
      return state;
  }
}

export const getCurrentUserData = () => async dispatch => {
  try {
    const {currentUser} = await firebase.auth();
    let userUid = currentUser.uid;
    firebase
      .firestore()
      .collection('users')
      .doc(userUid)
      .onSnapshot(function (doc) {
        console.log('Quang ngu', doc.data());
        dispatch(setCurrentUser(doc.data()));
      });
  } catch (e) {
    console.log('getCurrentUserData error', e);
  }
};

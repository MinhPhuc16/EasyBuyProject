import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const logoutUser = () => {
  try {
    firebase.auth().signOut();
  } catch (e) {
    console.log(e.message);
  }
};

export const signUpUser = async ({name, email, password}) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            name: name,
            email: email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
          })
          //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch(error => {
            console.log(
              'Something went wrong with added user to firestore: ',
              error,
            );
          });
      })
      //we need to catch the whole sign up process if it fails too.
      .catch(error => {
        console.log('Something went wrong with sign up: ', error);
      });
  } catch (e) {
    console.log(e);
  }
};

export const loginUser = async ({email, password}) => {
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        const {currentUser} = await firebase.auth();
        let userUid = currentUser.uid;
        firebase
          .firestore()
          .collection('users')
          .doc(userUid)
          .get()
          .then(function (doc) {
            console.log('userDattaaa', doc.data());
          });
      });
  } catch (error) {
    console.log('signIN error', error);
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

export const addProductToUsersBag =
  (product, isFav, isDeleteFav, isDeleteBag) => async () => {
    console.log('product isFav isDeleteFav', product, isFav, isDeleteFav);
    try {
      const userProductsRef = firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      const userProductsSnap = await userProductsRef.get();
      const userData = await userProductsSnap.data();
      if (isFav) {
        if (isDeleteFav) {
          const favs = userData.userFavorites;
          favs.push(product);
          console.log('favs', favs);
          const filteredFavs = favs.filter(item => {
            return item.id !== product.id;
          });
          console.log('filteredFavs', filteredFavs);

          userProductsRef.set(
            {
              userFavorites: filteredFavs,
            },
            {merge: true},
          );
        } else {
          let shouldBeAdded = true;
          shouldBeAdded = userData.userFavorites.find(
            item => item.id === product.id,
          );
          shouldBeAdded ? null : userData.userFavorites.push(product);

          userProductsRef.set(
            {
              userFavorites: userData.userFavorites,
            },
            {merge: true},
          );
        }
      } else {
        if (isDeleteBag) {
          const bagProducts = userData.userProductsInBag;
          bagProducts.push(product);
          const filteredBagProducts = bagProducts.filter(item => {
            if (
              item.id === product.id &&
              item.color === product.color &&
              item.size === product.size
            ) {
              return false;
            } else {
              return true;
            }
          });

          userProductsRef.set(
            {
              userProductsInBag: filteredBagProducts,
            },
            {merge: true},
          );
        } else {
          if (userData.userProductsInBag === undefined) {
            const userProductsInBag = [];
            userProductsInBag.push(product);
            userProductsRef.set(
              {
                userProductsInBag,
              },
              {merge: true},
            );
          } else {
            let shouldBeAddedToBag = true;
            shouldBeAddedToBag = userData.userProductsInBag.find(
              item =>
                item.id === product.id &&
                item.color === product.color &&
                item.size === product.size,
            );

            shouldBeAddedToBag
              ? null
              : userData.userProductsInBag.push(product);
            userProductsRef.set(
              {
                userProductsInBag: userData.userProductsInBag,
              },
              {merge: true},
            );
          }
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };

export const deleteBagProducts = () => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid);

    userProductsRef.update({
      userProductsInBag: firebase.firestore.FieldValue.delete(),
    });
  } catch (e) {
    console.log('deleteBagProducts', e);
  }
};

export const addOrderedProducts =
  (products, paymentMethod, shippingAddress, deliveryMethod) => async () => {
    try {
      const date = new Date(Date.now()).toLocaleString().split(',')[0];
      const userProductsRef = firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      const userProductsSnap = await userProductsRef.get();
      const userData = await userProductsSnap.data();

      userData.orders.push({
        orderNo: randomString(7, 'n'),
        trackingNo: randomString(12),
        quantity: products.length,
        totalAmount: totalAmount(products),
        date: date,
        orderedProducts: products,
        paymentMethod: paymentMethod,
        shippingAddress: shippingAddress,
        deliveryMethod: deliveryMethod,
      });
      userProductsRef.set(
        {
          orders: userData.orders,
        },
        {merge: true},
      );
    } catch (e) {
      console.log('error', e);
    }
  };

export const countDecreaser = async item => {
  try {
    const ref = await firebase.firestore().collection('products').doc(item.id);
    return firebase.firestore().runTransaction(function (transaction) {
      return transaction
        .get(ref)
        .then(function (productsSnap) {
          const productData = productsSnap.data();
          const colorIndex = productData.colors.findIndex(
            colorItem => colorItem.color === item.color,
          );
          productData.colors[colorIndex].count -= item.selectedCount;

          const sizeIndex = productData.sizes.findIndex(
            sizeItem => sizeItem.size === item.size,
          );
          productData.sizes[sizeIndex].count -= item.selectedCount;

          transaction.update(ref, {
            colors: productData.colors,
            sizes: productData.sizes,
            count: productData.count - item.selectedCount,
          });
        })
        .then(function () {
          console.log('Transaction successfully committed!');
        })
        .catch(function (error) {
          console.log('Transaction failed: ', error);
        });
    });
  } catch (error) {
    console.log('decrease count error', error);
  }
};

export const setCountSize = async payload => {
  try {
    const countRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid);

    const countSnap = await countRef.get();
    const countData = countSnap.data();
    const updatedProducts = [];
    countData.userProductsInBag.forEach(product => {
      if (
        product.id === payload.productID &&
        product.color === payload.color &&
        product.size === payload.size
      ) {
        updatedProducts.push({
          ...product,
          selectedCount: payload.selectedCount,
        });
      } else {
        updatedProducts.push(product);
      }
    });
    countRef
      .set(
        {
          userProductsInBag: updatedProducts,
        },

        {merge: true},
      )
      .catch(error => {
        console.log(
          'Something went wrong with added user to firestore: ',
          error,
        );
      });
  } catch (error) {
    console.log('countData error', error);
  }
};
export const getData = async (gender, category) => {
  const products = [];
  let ref = {};
  try {
    if (category === undefined) {
      ref = firebase
        .firestore()
        .collection('products')
        .where(
          'gender',
          gender === undefined ? 'in' : '==',
          gender === undefined ? ['men', 'women'] : gender,
        );
    } else {
      ref = firebase
        .firestore()
        .collection('products')
        .where('tags', 'array-contains', category)
        .where(
          'gender',
          gender === undefined ? 'in' : '==',
          gender === undefined ? ['men', 'women'] : gender,
        );
    }
    const productsSnap = await ref.get();
    productsSnap.forEach(product => {
      const data = product.data();
      products.push({
        id: product.id,
        ...data,
      });
    });
  } catch (e) {
    console.log('error', e);
  }
  return products;
};

export const getOnSaleData = async sale => {
  const saleProducts = [];
  try {
    const ref = firebase
      .firestore()
      .collection('products')
      .where('tags', 'array-contains', sale);

    const productsSnap = await ref.get();
    productsSnap.forEach(product => {
      const data = product.data();
      saleProducts.push({
        id: product.id,
        ...data,
      });
    });
  } catch (e) {
    console.log('error', e);
  }
  return saleProducts;
};
export const getDataByCategoryGenderAndFilter = async (
  category,
  gender,
  isSortClicked,
  sortType,
) => {
  const products = [];
  try {
    let ref;
    if (isSortClicked) {
      ref = firebase
        .firestore()
        .collection('products')
        .where('tags', 'array-contains', category)
        .where(
          'gender',
          gender === undefined ? 'in' : '==',
          gender === undefined ? ['men', 'women'] : gender,
        )
        .orderBy('price', sortType);
    } else {
      ref = firebase
        .firestore()
        .collection('products')
        .where('tags', 'array-contains', category)
        .where(
          'gender',
          gender === undefined ? 'in' : '==',
          gender === undefined ? ['men', 'women'] : gender,
        );
    }

    const productsSnap = await ref.get();

    productsSnap.forEach(product => {
      const data = product.data();
      products.push({
        id: product.id,
        ...data,
      });
    });
  } catch (e) {
    console.log('error', e);
  }
  return products;
};
export const selectShippingAddress = async pressedIndex => {
  try {
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid);

    const userSnap = await userRef.get();
    const userData = userSnap.data();

    userData.shippingAddresses.map((address, index) => {
      if (index === pressedIndex) {
        address.isSelected = true;
      } else {
        address.isSelected = false;
      }
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
          'Something went wrong with a selectShippingAddressto firestore: ',
          error,
        );
      });
  } catch (error) {
    console.log('selectShippingAddress error', error);
  }
};

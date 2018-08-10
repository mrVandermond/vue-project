import firebase from 'firebase'

export default {
  /* eslint-disable */
  updateProfile ({state}, data) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.updateProfile({
        displayName: data.displayName,
        phoneNumber: data.phoneNumber
      }).then(
        () => {
          firebase.auth().currentUser.updateEmail(data.email).then(
            () => resolve(),
            () => reject()
          );
        },
        () => reject()
      );
    });
  }
}
import firebase from 'firebase'

export default {
  SET_ACTIVE_MSG (state) {
    state.isActiveMsg = !state.isActiveMsg;
  },
  SET_USER (state) {
    state.user = firebase.auth().currentUser;
  }
}
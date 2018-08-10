export default {
  SET_ACTIVE_MSG (state) {
    state.isActiveMsg = !state.isActiveMsg;
  },
  SET_ACTIVE_EDIT (state) {
    state.isActiveEdit = !state.isActiveEdit;
  },
  TEST (state, data) {
    state.test = data.test
  }
}
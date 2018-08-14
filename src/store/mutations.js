export default {
  SET_ACTIVE_MSG (state) {
    state.isActiveMsg = !state.isActiveMsg;
  },
  SET_ACTIVE_EDIT (state) {
    state.isActiveEdit = !state.isActiveEdit;
  },
  SET_COUNT_POST (state, data) {
    state.countPost = data.countPost;
  },
  SET_COUNT_PAGE(state) {
    state.countPage = Math.ceil(state.countPost / state.postPerPage);
  }
}
export default {
  SET_ACTIVE_MSG(state) {
    state.isActiveMsg = !state.isActiveMsg;
  },
  SET_ACTIVE_CHANGE_PASSWORD(state) {
    state.isActiveChangePassword = !state.isActiveChangePassword;
  },
  SET_ACTIVE_EDIT(state) {
    state.isActiveEdit = !state.isActiveEdit;
  },
  SET_ACTIVE_TOOLTIP(state, data) {
    state.msgTooltip = data.msgTooltip;
    state.typeTooltip = data.typeTooltip;
    state.isActiveTooltip = !state.isActiveTooltip;
  },
  SET_ACTIVE_POPUP(state, data) {
    state.msgPopUp = data.msgPopUp;
    state.isActivePopUp = !state.isActivePopUp;
  },
  SET_COUNT_POST(state, data) {
    state.countPost = data.countPost;
  },
  SET_COUNT_PAGE(state) {
    state.countPage = Math.ceil(state.countPost / state.postPerPage);
  },
  SET_CURRENT_PAGE(state, data) {
    if (data.typeClick) {
      if (data.typeClick == "left") state.currentPage--;
      else if (data.typeClick == "right") state.currentPage++;
    } else if (data.numPage) {
      state.currentPage = data.numPage;
      if (state.currentPage != 1) {
        state.currentIndexPost =
          (state.currentPage - 1) * state.postPerPage + 1;
      } else {
        state.currentIndexPost = 1;
      }
    }
  },
  SET_CURRENT_INDEX_POST(state, data) {
    if (data.typeClick == "left") state.currentIndexPost -= state.postPerPage;
    else if (data.typeClick == "right")
      state.currentIndexPost += state.postPerPage;
  },
  SET_ACTIVE_POSTS(state, data) {
    state.postList = data.posts;
  },
  SET_ACTIVE_LAST_POSTS(state, data) {
    state.lastPostList = data.posts;
  },
  SET_USER_PHOTO_URL(state, data) {
    state.userPhotoURL = data.photoURL;
  }
};

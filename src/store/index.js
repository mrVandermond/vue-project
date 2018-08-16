import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isActiveMsg: true,
    isActiveEdit: false,
    isActiveChangePassword: false,
    isActivePopUp: false,
    countPost: 0,
    postPerPage: 10,
    countPage: 0,
    currentPage: 1,
    currentIndexPost: 1,
    postList: {},
    userPhotoURL: "",
    timeAliveTooltip: 2000,
    isActiveTooltip: false,
    msgTooltip: "",
    typeTooltip: "",
    msgPopUp: ""
  },
  mutations,
  actions,
  getters
});

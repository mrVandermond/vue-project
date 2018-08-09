export default {
  updateDisplayName ({state, commit}, data) {
    state.user.updateProfile({
      displayName: data.displayName
    }).then(
      // eslint-disable-next-line
      () => console.log('success update name'),
      // eslint-disable-next-line
      (e) => console.log(e.message)
    )
    commit('SET_USER');   
  },
  updateEmail ({state, commit}, data) {
    state.user.updateEmail(data.email).then(
      // eslint-disable-next-line
      () => console.log('success update email'),
      // eslint-disable-next-line
      (e) => console.log(e.message)
    )
    commit('SET_USER');
  },
  updatePhone ({state, commit}, data) {
    state.user.updateProfile({
      phoneNumber: data.phone
    }).then(
      // eslint-disable-next-line
      () => console.log('success update phone'),
      // eslint-disable-next-line
      (e) => console.log(e.message)
    )
    commit('SET_USER')
  }
}
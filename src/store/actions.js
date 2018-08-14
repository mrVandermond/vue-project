import firebase, { database } from 'firebase/app'

export default {
  /* eslint-disable */
  updateProfile ({state}, data) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.updateProfile({
        displayName: data.displayName
      }).then(
        () => {
          firebase.auth().currentUser.updateEmail(data.email).then(
            () => resolve(),
            (e) => reject(e)
          );
        },
        () => reject()
      );
    });
  },
  addNewPost ({commit}, data) {
    return new Promise((resolve, reject) => {
      if (!database) reject();
      database().ref('/countPost/').on('value', (snapshot) => {
        let countPost = snapshot.val();
        resolve(countPost);
      });
    }).then(
      (countPost) => {
        return new Promise((resolve, reject) => {
          commit('SET_COUNT_POST', {countPost: countPost});
          countPost++;
          database().ref('/countPost/').set(countPost);
          database().ref('/posts/' + countPost).set({
            text: data.text,
            pubdate: data.pubdate,
            author: data.author
          });
          if (!database()) reject()
          console.log('success added');
          resolve();
        });
      },
      (e) => console.warn(e.message)
    )
  },
  getCountPost ({commit}) {
    var countPost = 0;
    database().ref('countPost').on('value', (snapshot) => {
      countPost = snapshot.val();
      commit('SET_COUNT_POST', {countPost: countPost});
      commit('SET_COUNT_PAGE');
    });
  }
}
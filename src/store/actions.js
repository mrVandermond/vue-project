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
          database().ref('/posts/' + (countPost + 1)).set({
            text: data.text,
            pubdate: data.pubdate,
            author: data.author,
            id: countPost + 1
          });
          countPost++;
          database().ref('/countPost/').set(countPost);
          if (!database()) reject()
          console.log('success added');
          resolve();
        });
      },
      (e) => console.warn(e.message)
    )
  },
  getCountPost ({state, commit}) {
    var countPost = 0;
    database().ref('/countPost/').on('value', (snapshot) => {
      countPost = snapshot.val();
      if (countPost != state.countPost) {
        commit('SET_COUNT_POST', {countPost: countPost});
        commit('SET_COUNT_PAGE');
      }
    });
  },
  getPost ({state, commit}, data) {
    return new Promise((resolve, reject) => {
      if (data) {
        commit('SET_CURRENT_PAGE', {typeClick: data.typeClick});
        commit('SET_CURRENT_INDEX_POST', {typeClick: data.typeClick});
        
      }
      var start = state.currentIndexPost;
      var end = start + state.postPerPage - 1;
      if (!database) reject();
      database().ref('posts').orderByChild('id').startAt(start).endAt(end).on('value', (snapshot) => {
        let posts = snapshot.exportVal();
        commit('SET_ACTIVE_POSTS', {posts: posts});
        resolve();
       });
    })
  }
}
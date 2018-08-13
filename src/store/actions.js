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
            () => reject()
          );
        },
        () => reject()
      );
    });
  },
  addNewPost ({state, commit}, data) {
    return new Promise((resolve, reject) => {
      database().ref('/countPost/').on('value', (snapshot) => {
        let countPost = snapshot.val();
        resolve(countPost);
      });
    }).then(
      (countPost) => {
        return new Promise((resolve, reject) => {
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
        })
      },
      (e) => console.warn(e.message)
    )
  },
  getPosts ({state, commit}) {
    return new Promise((resolve, reject) => {
      database().ref('/posts/').on('value', (snapshot) => {
        let post = snapshot.val();
        resolve(post);
      });
      if (!database) reject();
    }).then(
      (post) => {
        commit('SET_POST_LIST', post);
        console.log('success get');
      },
      (e) => console.warn(e)
    )
  }
}
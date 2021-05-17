export const userData = (user) => {
  const db = firebase.firestore();
  let Photo;
  let Name;
  if (user.photoURL != null && user.displayName != null) {
    Photo = user.photoURL;
    Name = user.displayName;
  } else {
    Photo = './imageProject/avatar.png';
    Name = 'User';
  }
  return db.collection('SN_Users').doc(user.uid).set({
    username: Name,
    email: user.email,
    photo: Photo,
    photoCover: Photo,
    profesión: 'Profesión',
  });
};
// Función para solicitar información de usuario
export const getUserData = (userId) => firebase.firestore().collection('SN_Users').doc(userId).get();

// Función para actualizar la información del usuario
export const updateCurrentUser = (userId, Username, Profesión) => {
  const db = firebase.firestore();
  return db.collection('SN_Users').doc(userId).update({
    username: Username,
    profesión: Profesión,
  });
};
// Función para la creación de los post agrengandolo a la collecion
export const postAdd = (UserId, Publication, URLimg) => {
  const db = firebase.firestore();
  return db.collection('wartay').add({
    userId: UserId,
    date: new Date().toLocaleString(),
    publication: Publication,
    urlimg: URLimg,
    likes: [],
  });
};
// Función para solicitar los datos para el post agregados a la coleccion
export const getPost = (callback) => {
  const db = firebase.firestore();
  db.collection('wartay').orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      const post = [];
      querySnapshot.forEach((doc) => {
        post.push({ id: doc.id, ...doc.data() });
      });
      callback(post);
    });
};
// Función para la creación de los comentarios agrengandolo a la collecion
export const commentAdd = (UserId, idPost, Comment) => {
  const db = firebase.firestore();
  return db.collection('wartay').doc(idPost).collection('SN_Comment').add({
    userId: UserId,
    date: new Date().toLocaleString(),
    comment: Comment,
  });
};
// Función para solicitar los datos para el comentarios agregados a la coleccion
export const getComment = (idPost, callback) => {
  const db = firebase.firestore();
  db.collection(`wartay/${idPost}/SN_Comment`).orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      const comment = [];
      querySnapshot.forEach((doc) => {
        comment.push({ id: doc.id, ...doc.data() });
      });
      callback(comment);
    });
};
// Función para eliminar los post
export const removePost = (idPost) => firebase.firestore().collection('wartay').doc(idPost).delete();

// Función para eliminar los comentario
export const removeComment = (idPost, idComment) => firebase.firestore().collection(`wartay/${idPost}/SN_Comment`).doc(idComment).delete();

// Función para actualización de foto de perfil
export const profilePhoto = (userId, photo) => firebase.firestore().collection('SN_Users').doc(userId).update({ photo });

// Función para actualizar foto de cover
export const coveragePhoto = (userId, photoCover) => firebase.firestore().collection('SN_Users').doc(userId).update({ photoCover });

// Función para actualización de post
export const upgradePost = (idPost, updatePublication) => {
  const db = firebase.firestore();
  return db.collection('wartay').doc(idPost).update({
    publication: updatePublication,
  });
};
// Función para actualización de comentarios
export const upgradeComment = (idPost, idComment, comment) => firebase.firestore().collection(`wartay/${idPost}/SN_Comment`).doc(idComment).update({ comment });

// Función para actualización de likes
export const upgradeLike = (id, likes) => firebase.firestore().collection('wartay').doc(id).update({ likes });

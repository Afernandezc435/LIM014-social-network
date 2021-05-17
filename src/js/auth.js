// Funciones para iniciar sesión(correo, gmail, facebook)
export const signIn = (email, password) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};
export const loginGoogle = () => {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
// Funcion para crear usuario nuevo
export const signUp = (email, password) => {
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
};
// Enviar correo para verificación
export const emailVerification = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification();
};
// Función para cerrar sesión
export const signOut = () => firebase.auth().signOut();

// Administración de usuarios Firebase
export const currentUser = (callback) => {
  firebase.auth().onAuthStateChanged((user) => callback(user));
};

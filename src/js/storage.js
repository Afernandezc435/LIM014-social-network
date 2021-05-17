// Función para guardar foto del usario
export const imgStorage = (file, location) => {
  const storageRef = firebase.storage().ref(`${location}/${file.name}`);
  return storageRef.put(file);
};

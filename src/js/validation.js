// Función que valida el correo
export const validateEmail = (email) => {
  // expresión regular que simula el patron de búsqueda del correo electrónico
  const regEx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return regEx.test(email);
};

// funcion que valida si los datos de usuario no estan vacios y email es valido
export const validateUser = (userEmail, userPass) => {
  if (
    !validateEmail(userEmail)
    || userEmail === ''
    || userPass === ''
    || userPass < 6
  ) {
    return false;
  }
  return true;
};
// valida datos de nuevo usuario
export const validateNewUser = (
  newUserEmail,
  newUserPass,
  newUserName,
  newUserLastName,
) => {
  if (
    !validateEmail(newUserEmail)
    || newUserEmail === ''
    || newUserPass === ''
    || newUserPass < 6
    || newUserName === ''
    || newUserLastName === ''
  ) {
    return false;
  }
  return true;
};

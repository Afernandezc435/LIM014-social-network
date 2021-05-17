// importamos la funcion que vamos a testear
import {
  validateUser,
  validateNewUser,
  validateEmail,
} from '../src/js/validation.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);
// Función validateEmail
describe('validateEmail', () => {
  it('si es un correo valido seria true', () => {
    expect(validateEmail('erika.andreina.3@gmail.com')).toBe(true);
  });
  it('si es un correo invalido seria false', () => {
    expect(validateEmail('erika5501@')).toBe(false);
  });
});

// Función validateUser
describe('validateUser', () => {
  it('si es un correo valido seria true', () => {
    expect(validateUser('erika.andreina.3@gmail.com')).toBe(true);
  });
  it('si es un correo invalido seria false', () => {
    expect(validateUser('erika5501@')).toBe(false);
  });
});
// Función validateNewUser
describe('validateNewUser', () => {
  it('si es un correo valido seria true', () => {
    expect(validateNewUser('erika.andreina.3@gmail.com')).toBe(true);
  });
  it('si es un correo invalido seria false', () => {
    expect(validateNewUser('1234')).toBe(false);
  });
});

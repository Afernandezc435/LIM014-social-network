import {
  signIn,
  loginGoogle,
  loginFacebook,
  signUp,
  emailVerification,
  signOut,
  currentUser,
} from '../src/js/auth.js';

const firebasemock = require('firebase-mock');

/* jest.mock('firebase-mock', () => ({
  auth: () => ({
    onAuthStateChanged: (callback) => {
      callback({ id: 'abc01' });
    },
  }),
}));
*/
const mockauth = new firebasemock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
);
// Función signIn
describe('función signIn', () => {
  it('Deberia ser una función', () => {
    expect(typeof signIn).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función signUp
describe('función signUp', () => {
  it('Deberia ser una función', () => {
    expect(typeof signUp).toBe('function');
  });
  it('Debería poder registrarse', () => signUp('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
  // Función emailVerification
  describe('función emailVerification', () => {
    it('Deberia ser una función', () => {
      expect(typeof emailVerification).toBe('function');
    });
    it('Debería enviar un email de verificación', () => {
      const verificationMock = jest.fn();
      firebase.auth().currentUser.sendEmailVerification = verificationMock;
      emailVerification();
      expect(verificationMock).toHaveBeenCalled();
      expect(verificationMock.mock.calls).toHaveLength(1);
    });
  });
  // eslint-disable-next-line jest/no-focused-tests
});
// Función Facebook
describe('Debería poder iniciar sesion con cuenta de facebook', () => {
  it('Debería ser una funcion', () => {
    expect(typeof loginFacebook).toBe('function');
  });
  it('Deberia poder iniciar sesión', () => loginFacebook()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});
// Función Google
describe('loginGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  it('debería poder ingresar con Google', () => {
    loginGoogle('kelmita22@gmail.com')
      .then((user) => {
        expect(user.email).toBe('kelmita22@gmail.com');
      });
  });
});
// Función signOut
describe('función signOut', () => {
  it('Deberia ser una función', () => {
    expect(typeof signOut).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});

// Función currentUser
describe('Función para administrar usuarios firebase', () => {
  it('Deberia ser una función', () => {
    expect(typeof currentUser).toBe('function');
  });
  it('Deberia mostrar el usuario ingresado', () => {
    const userMock = {
      currentUser: { id: 'abc01' },
    };
    firebase.auth().onAuthStateChanged().currentUser = userMock.currentUser;
    const isUser = (user) => {
      expect(user.id).toEqual('abc01');
    };
    currentUser(isUser);
  });
});

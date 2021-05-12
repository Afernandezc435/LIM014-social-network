import {
  signIn, loginGoogle, loginFacebook,
} from '../js/auth.js';
import { userData, getUserData } from '../js/firestore.js';

export default () => {
  const viewLogin = document.createElement('section');
  viewLogin.classList.add('container');
  viewLogin.innerHTML = `
    <section class="forms-container">
      <section class="signin-signup" >
        <form action="#" class="sign-in-form">
          <img src="imageProject/iconWartay.png" class="logo" alt="" />
          <h2 class="title">Bienvenido a Wartay, la red de estudiantes y profesores a nivel mundial </h2>
          <section class="input-field">
            <i></i>
            <input id="userEmail" type="text" placeholder="Email" />
          </section>
          <section class="input-field">
            <i></i>
            <input id="userPassword" type="password" placeholder="Contraseña" />
          </section>
          <input type="submit" value="Login" class="btn solid" />
          <p id="error-message"></p>
          <p class="social-text">o bien ingresa con...</p>
          <section class="social-media">
            <a id="btnFacebook" href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a id="btnGmail" href="#" class="social-icon">
              <i class="fab fa-google"></i>
            </a>
          </section>
        </form>
      </section>
    </section>
    <section class="panels-container">
      <section class="panel left-panel">
        <section class="content">
          <h3 class="h3">Si no estas registrado</h3>
          <p class="pa">
          Da click en nuestro botón de registrate para crear una cuenta
          </p>
          <button class="btn transparent" id="signUpBtn">
            Registrate
          </button>
          </section>
            <img src="imageProject/logoD.png" class="image" alt="" />
          </section>
        </section>
      </section>
    </section>
  </section>
`;
  // Login
  const btnNewAccount = viewLogin.querySelector('#signUpBtn');
  btnNewAccount.addEventListener('click', () => { window.location.hash = '#/registrate'; });
  // Función para registarse con Gmail
  const btnGoogle = viewLogin.querySelector('#btnGmail');
  btnGoogle.addEventListener('click', () => {
    loginGoogle()
      .then((data) => {
        getUserData(data.user.uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/home';
            } else {
              userData(data.user)
                .then(() => {
                  window.location.hash = '#/home';
                });
            }
          });
      });
  });
  // Función para registarse con Facebook
  const btnFacebook = viewLogin.querySelector('#btnFacebook');
  btnFacebook.addEventListener('click', () => {
    loginFacebook()
      .then((data) => {
        getUserData(data.user.uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/home';
            } else {
              userData(data.user)
                .then(() => {
                  window.location.hash = '#/home';
                });
            }
          });
      });
  });
  // Función para verificar credenciales
  const signInForm = viewLogin.querySelector('.solid');
  signInForm.addEventListener('click', (e) => {
    e.preventDefault();
    const email = viewLogin.querySelector('#userEmail').value;
    const password = viewLogin.querySelector('#userPassword').value;
    const error = viewLogin.querySelector('#error-message');
    signIn(email, password)
      .then((data) => {
        if (data.user.emailVerified) {
          getUserData(data.user.uid)
            .then((doc) => {
              if (doc.exists) {
                window.location.hash = '#/home';
              } else {
                userData(data.user)
                  .then(() => {
                    window.location.hash = '#/home';
                  });
              }
            });
        } else {
          error.textContent = 'Revise su bandeja de entrada, para verificar su cuenta';
        }
      })
      .catch((err) => {
        error.textContent = err.message;
        setTimeout(() => {
          error.textContent = '';
        }, 5000);
      });
  });
  return viewLogin;
};

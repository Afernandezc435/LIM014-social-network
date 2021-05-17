import {
  updateCurrentUser, profilePhoto, coveragePhoto, getPost,

} from '../js/firestore.js';

import {
  currentUser, signOut,
} from '../js/auth.js';
import { imgStorage } from '../js/storage.js';
import { itemPost } from './post.js';

export default (dataCurrentUser) => {
  const viewProfile = document.createElement('div');

  const isUser = (user) => {
    if (user || user !== null) {
      viewProfile.classList.add('profile-container');
      viewProfile.innerHTML = `
  <section class="main-header">
  <nav>
  <ul class="menu-header">
    <div id="left-menu-header" class= "box">
      <li class="home-header"><a href="#/home"><i class="fas fa-home"></i>Home</a></li>
      <li class="profile-header"><a href="#/profile"><i class="fas fa-user-circle"></i>Profile</a></li>
    </div>
      <li class="title-header box"><a href="#/home"><img class="logowar" src="./imageProject/logow.png" width="50px">Wartay</a></li>
      <li id="log-out-header" class="box"><span id ="btn-singOut"><i class="fas fa-sign-out-alt"></i>Cerrar Sesión</span></li>
  </ul>
  </nav>
  <i id="hamburger-menu" class="fas fa-bars hide"></i>
  </section>
  <div class="profile-content">
  <div class="profile-background">
    <div class="profile-information shadow">
      <div class="cover-page">
        <img class="cover-photo" src="${dataCurrentUser.photoCover}">
      </div>
      <label id="select-cover" for="select-cover-page">
        <input type="file" id="select-cover-page" class="hide" accept="image/jpeg, image/png">
        <span class="edit-cover"><i class="fas fa-camera edit-photo-btn"></i></span>
      </label>
      <div class="profile-photo">
        <img class="photo" src="${dataCurrentUser.photo}">
      </div>
      <label id="select-profile" for="select-photo-profile">
        <input type="file" id="select-photo-profile" class="hide" accept="image/jpeg, image/png">
        <span class="edit-photo"><i class="fas fa-camera edit-photo-btn"></i></span>
      </label>
      <div class="user-information">
      <span class = "edit-info" id="btn-editProfile"><i class="fas fa-edit"><span class="tooltiptext">Edit information</span></i></span>
        <h2 class="user-name">${dataCurrentUser.username}</p>
        <h2 class="user-name">${dataCurrentUser.profesión}</p>
      </div>
    </div>
  </div>
</div>
<section class ="container-user-post">
  <p> Aún no tienes publicaciónes! </p>
</section>
<section class="modal-container">
  <section class="modal-settings">
    <header class="modalHeader">
      <button class="btn-modalClose"><i class="fa fa-close"></i></button>
      <h2 class="modalTitle">Edit user profile</h2>
      <hr>
    </header>
    <form class="editProfile">
      <div class="grupo">
      <label  for="usernameEdit">User name : </label>
      <input type="text" id="usernameEdit" value="${dataCurrentUser.username}">
      <label  for="userProfesión">User Profetion : </label>
      <select id="userProfesión" class="controls" name="Orden" >
  <option value="" disabled selected>Ejem.Prof, estudiante, padre</option>
  <option ${(dataCurrentUser.profesión === 'Profesor') ? 'selected ' : ''}value="Profesor">Profesor</option>
  <option ${(dataCurrentUser.profesión === 'Profesora') ? 'selected ' : ''}value="Profesora">Profesora</option>
  <option ${(dataCurrentUser.profesión === 'Padre') ? 'selected ' : ''}value="Profesora">Padre</option>
  <option ${(dataCurrentUser.profesión === 'Madre') ? 'selected ' : ''}value="Madre">Madre</option>
  <option ${(dataCurrentUser.profesión === 'Estudiante') ? 'selected ' : ''}value="Estudiante">Estudiante</option>
  </select>
      </div>
      <button type="submit" class="btn-update">UPDATE</a></button>
    </form>
  </section>
</section>
<section class="modal-progress">
  <div class="progress">
    <progress value="0" max="100" id="uploader">0%</progress>
    <p id="messageProgress">0%</p>
  </div>
</section>
`;

      // Función para cerrar sesión
      const btnSignOut = viewProfile.querySelector('#btn-singOut');
      btnSignOut.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
        signOut();
      });
      const hamburgerBotton = viewProfile.querySelector('#hamburger-menu');
      const homeNav = viewProfile.querySelector('#left-menu-header');
      const singOut = viewProfile.querySelector('#log-out-header');
      hamburgerBotton.addEventListener('click', () => {
        homeNav.classList.toggle('active');
        singOut.classList.toggle('active');
      });

      const selectPhotoProfile = viewProfile.querySelector('#select-photo-profile');
      selectPhotoProfile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const uploadTask = imgStorage(file, 'SN-imgProfile');
        const messageProgress = viewProfile.querySelector('#messageProgress');
        const modalProgress = viewProfile.querySelector('.modal-progress');
        const uploader = viewProfile.querySelector('#uploader');
        uploadTask.on('state_changed', (snapshot) => {
          // Handle progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          modalProgress.classList.add('showModal');
          messageProgress.textContent = 'El cambio de foto se ha actualizado correctamente';
          uploader.value = progress;
        }, () => {
          // fallo al cargar
        }, () => {
          // carga exitosa
          uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              profilePhoto(user.uid, downloadURL)
                .then(() => window.location.reload());
            });
        });
      });
      /* -----------------foto de portada ------------------ */
      const selectCoverPage = viewProfile.querySelector('#select-cover-page');
      selectCoverPage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const uploadTask = imgStorage(file, 'SN-imgCover');
        const messageProgress = viewProfile.querySelector('#messageProgress');
        const modalProgress = viewProfile.querySelector('.modal-progress');
        const uploader = viewProfile.querySelector('#uploader');
        uploadTask.on('state_changed', (snapshot) => {
          // Handle progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          modalProgress.classList.add('showModal');
          messageProgress.textContent = 'El cambio de foto se ha actualizado correctamente';
          uploader.value = progress;
        }, () => {
          // fallo de carga
        }, () => {
          // carga exitosa
          uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              coveragePhoto(user.uid, downloadURL)
                .then(() => window.location.reload());
            });
        });
      });

      /* -----------------abriir perfil de usuario para cambio de foto------------------ */
      const formEditProfile = viewProfile.querySelector('.editProfile');
      const modalContainer = viewProfile.querySelector('.modal-container');
      const btnEditProfile = viewProfile.querySelector('#btn-editProfile');
      btnEditProfile.addEventListener('click' || 'touch', () => {
        modalContainer.classList.add('showModal');
      });
      /* -----------------cerrar modal edición de perfil------------------ */
      const btnModalClose = viewProfile.querySelector('.btn-modalClose');
      btnModalClose.addEventListener('click' || 'touch', (e) => {
        e.preventDefault();
        modalContainer.classList.remove('showModal');
        formEditProfile.reset();
      });
      // cerrar el modal con un click por fuera
      window.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
          modalContainer.classList.remove('showModal');
          formEditProfile.reset();
        }
      });
      /* -----------------enviar la edición del perfil------------------ */
      formEditProfile.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameEdit = viewProfile.querySelector('#usernameEdit').value;
        const userProfetion = viewProfile.querySelector('#userProfesión').value;
        updateCurrentUser(user.uid, usernameEdit, userProfetion)
          .then(() => {
            window.location.reload();
          });
      });

      /* ---------------------- agregar post------------------*/
      const containerUserPost = viewProfile.querySelector('.container-user-post');
      getPost((post) => {
        containerUserPost.innerHTML = '';
        post.forEach((objPost) => {
          if (user.uid === objPost.userId) {
            containerUserPost.appendChild(itemPost(objPost));
          }
        });
      });
    } else {
      window.location.hash = '#/';
    }
  };
  /* -----------------cambiar foto de perfil------------------ */
  currentUser(isUser);
  return viewProfile;
};

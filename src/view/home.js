import {
  postAdd, getPost,
} from '../js/firestore.js';
import { imgStorage } from '../js/storage.js';
import { itemPost } from './post.js';
import { signOut, currentUser } from '../js/auth.js';

export default (dataCurrentUser) => {
  const viewHome = document.createElement('section');
  const isUser = (user) => {
    if (user || user !== null) {
      viewHome.classList.add('container-home');
      viewHome.innerHTML = `
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
<section id="prueba">
  <!-- columna -->
  <aside class="profile-section">
    <div class="profile">
      <img class="avatar" src="${dataCurrentUser.photo}"/>
      <h2 id="name"> ${dataCurrentUser.username}</h2>
      <h2 id="name">${dataCurrentUser.profesión}</p> 
    </div>
  </aside>
  <!-- media columna -->
  <main class="home-section">
    <!-- Post -->
    <div class="create-post">
      <div class="user">
        <img class="avatar-post" src="${dataCurrentUser.photo}"/>
        <p class="name">${dataCurrentUser.username}</p>
      </div>
      <div class="content-newpost">
        <form id = "form-post">
          <textarea class="text-newpost" placeholder="Share something" spellcheck="false" required></textarea>
          <i id = "remove-img" style="display: none" class="fas fa-times-circle"></i>
          <img id="post-img" class="post-img" src=""/>
          <div class="buttons-bar">
            <label for="upload-img">
              <input type="file" accept="image/jpeg, image/png, image/gif" id="upload-img" class="upload-img">
              <i class="far fa-file-image"><span class="tooltiptext">Upload an image</span></i>
            </label>
            <button type="submit" id="btn-post" class="btn-post" ><i class="fas fa-paper-plane"></i> Share</button>
          </div>
        </form>
      </div>
    </div>
    <section id="container-post"></section>
    </section>
  </main>
  <section class="modal-progress">
    <div class="progress">
      <progress value="0" max="100" id="uploader">0%</progress>
      <p id="messageProgress">0%</p>
    </div>
  </section>
  `;
      const hamburgerBotton = viewHome.querySelector('#hamburger-menu');
      const homeNav = viewHome.querySelector('#left-menu-header');
      const singOut = viewHome.querySelector('#log-out-header');
      hamburgerBotton.addEventListener('click', () => {
        homeNav.classList.toggle('active');
        singOut.classList.toggle('active');
      });

      // Función para cerrar sesión
      const btnSignOut = viewHome.querySelector('#btn-singOut');
      btnSignOut.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
        signOut();
      });
      const imagePost = viewHome.querySelector('#post-img');
      const imageDelete = viewHome.querySelector('#remove-img');
      const uploadImg = viewHome.querySelector('#upload-img');

      // Función para cargar imagen para publicar
      uploadImg.addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          imagePost.src = reader.result;
        };
        imageDelete.removeAttribute('style');
      });
      // Eliminar imagen del post
      imageDelete.addEventListener('click', () => {
        imagePost.src = '';
        uploadImg.value = '';
        imageDelete.style.display = 'none';
      });
      // Guardar post en firestore
      const savePost = viewHome.querySelector('#form-post');
      savePost.addEventListener('submit', (e) => {
        e.preventDefault();
        imagePost.src = '';
        imageDelete.style.display = 'none';
        const fileImage = e.target.closest('#form-post').querySelector('input').files[0];
        const load = viewHome.querySelector('#uploader');
        const postText = viewHome.querySelector('.text-newpost');
        const enterModal = viewHome.querySelector('.modal-progress');
        const textModal = viewHome.querySelector('#messageProgress');

        if (fileImage) {
          const uploadTask = imgStorage(fileImage, 'SN-imgPost');
          uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            enterModal.classList.add('showModal');
            textModal.textContent = 'Tu publicación fue completada exitosamente';
            load.value = progress;
          },
          () => {
          }, () => {
            uploadTask.snapshot.ref.getDownloadURL()
              .then((downloadURL) => {
                postAdd(user.uid, postText.value, downloadURL)
                  .then(() => {
                    enterModal.classList.remove('showModal');
                    savePost.reset();
                  });
              });
          });
        } else {
          postAdd(user.uid, postText.value, '')
            .then(() => {
              enterModal.classList.remove('showModal');
              savePost.reset();
            });
        }
      });
      /* -------------------------- agregar post----------------------*/
      const boxPost = viewHome.querySelector('#container-post');
      getPost((post) => {
        boxPost.innerHTML = '';
        post.forEach((objPost) => {
          boxPost.appendChild(itemPost(objPost));
        });
      });
    } else {
      window.location.hash = '#/';
    }
  };

  currentUser(isUser);
  return viewHome;
};

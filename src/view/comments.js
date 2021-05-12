import { upgradeComment, removeComment, getUserData } from '../js/firestore.js';
import {
  currentUser,
} from '../js/auth.js';

export const itemComment = (objComment, idPost) => {
  const coments = document.createElement('section');
  coments.classList.add('all-comments');
  const isUser = (user) => {
    if (user || user !== null) {
      const userId = user.uid;
      coments.innerHTML = `
      <section>
        <i class="fas fa-ellipsis-v btn-menu-comment"></i>
      <section id="menu-comment-content" class="menu-comment-content">
        <li id="edit-comment"><i class="fas fa-edit select"></i> Edit</li>
        <li id="delete-comment"><i class="fas fa-trash-alt select"></i> Delete</li>
      </section>
      </section> 
      <section class = "photo-comment-container">
        <img class="avatar-comment" src=""/>
      <section class = "comment-container">
        <p class="name-comment"></p>
        <p class = "comment-text">${objComment.comment}</p>
      <section class = "edit-comment-text-btns">
        <textarea class = "edit-comment-text">${objComment.comment}</textarea>
      <section class = "edit-comment-btns">
        <button type="button" class="btn-save-comment">Save</button>
        <button type="button" class="btn-cancel-comment">Cancel</button>
      </section>
      </section>
        <p class="time-comment">${objComment.date}</p>
      </section>
      </section>
      <section class="modal-progress">
<div class="alert">
  <p id="messageAlert"></p>
  <i class="fas fa-times-circle" id="closeModal"></i>
</div>
</section>
      
  `;
      getUserData(objComment.userId)
        .then((doc) => {
          const comentPhoto = coments.querySelector('.avatar-comment');
          const comentName = coments.querySelector('.name-comment');
          comentPhoto.src = doc.data().photo;
          comentName.textContent = doc.data().username;
        });
      // Función para mostrar los comentarios
      const comentBoton = coments.querySelector('.btn-menu-comment');
      comentBoton.addEventListener('click', () => {
        coments.querySelector('#menu-comment-content').style.display = 'block';
      });
      // Función para cerrar caja de comentarios
      window.addEventListener('click', (e) => {
        if (e.target !== comentBoton) {
          coments.querySelector('#menu-comment-content').style.display = 'none';
        }
      });
      // Función para editar y borrar comentarios
      const comentEdit = coments.querySelector('#edit-comment');
      const comentBox = coments.querySelector('.edit-comment-text');
      comentEdit.addEventListener('click', () => {
        if (userId === objComment.userId) {
          coments.querySelector('.edit-comment-text-btns').style.display = 'block';
        } else {
          const enterModal = coments.querySelector('.modal-progress');
          const textModal = coments.querySelector('#messageAlert');
          enterModal.classList.add('showModal');
          textModal.textContent = 'No puedes editar el comentario de otros usuario';
          const closeModal = coments.querySelector('#closeModal');
          closeModal.addEventListener('click', () => {
            enterModal.classList.remove('showModal');
          });
        }
      });
      // cancelar post
      const btnCancelEdit = coments.querySelector('.btn-cancel-comment');
      btnCancelEdit.addEventListener('click', () => {
        coments.querySelector('.edit-comment-text-btns').style.display = 'none';
        comentBox.value = objComment.publication;
      });
      const comentBtnSave = coments.querySelector('.btn-save-comment');
      comentBtnSave.addEventListener('click', () => {
        upgradeComment(idPost, objComment.id, comentBox.value);
      });
      const comentRemove = coments.querySelector('#delete-comment');
      comentRemove.addEventListener('click', () => {
        if (userId === objComment.userId) {
          removeComment(idPost, objComment.id);
        } else {
          const enterModal = coments.querySelector('.modal-progress');
          const textModal = coments.querySelector('#messageAlert');
          enterModal.classList.add('showModal');
          textModal.textContent = 'No puedes eliminar el comentario de otros usuario';
          const closeModal = coments.querySelector('#closeModal');
          closeModal.addEventListener('click', () => {
            enterModal.classList.remove('showModal');
          });
        }
      });
    } else {
      window.location.hash = '#/';
    }
  };

  currentUser(isUser);
  return coments;
};

import {
  removePost, upgradePost, commentAdd, getComment, getUserData, upgradeLike,
} from '../js/firestore.js';
import {
  currentUser,
} from '../js/auth.js';
import { itemComment } from './comments.js';

export const itemPost = (objPost) => {
  const postElement = document.createElement('div');
  const isUser = (user) => {
    if (user || user !== null) {
      const userId = user.uid;
      // contador
      const reactionCounter = objPost.likes.length;
      postElement.classList.add('allpost');
      postElement.innerHTML = `
  <div class="mainpost">
  <div class="user-post">
    <div class="menu-post">
      <i class="fas fa-ellipsis-v btn-menu-post"></i>
      <ul id="menu-post-content" class="menu-post-content">
        <li id="edit-post"><i class="fas fa-edit select"></i> Edit</li>
        <li id="delete-post-${objPost.id}"><i class="fas fa-trash-alt select"></i> Delete</li>
      </ul>
    </div>               
    <img class="avatar-post" src=""/>
    <p class="name">
      <span class = "username"></span>
      <span class = "tooltiptext">
        <img class="tooltipimg" src=""/>
        <strong class="nametooltip"></strong> <br>
        <i class="fas fa-birthday-cake"></i> &nbsp <span id="birthdayTooltip"></span><br>
        <i class="fas fa-map-marker-alt"></i> &nbsp <span id="countryTooltip"></span>
      </span>
    </p>
    <p class="time-post">${objPost.date}</p>
  </div>       
  <div class="content-post">
    <p class="text-post">${objPost.publication}</p>
    <div class = "edit-text-post">
      <textarea class="edit-text">${objPost.publication}</textarea>
      <div class = "edit-text-btns">
        <button type="button" class="btn-save-edit-${objPost.id}">Save</button>
        <button type="button" class="btn-cancel-edit">Cancel</button>
      </div>
    </div>
    <img id="post-img" class="post-img" src='${objPost.urlimg}'/>
    <div class="like-comment-container">
    <section id="reactions">
      <p id="likes" class="${(reactionCounter === 0) ? 'hide' : 'count-like'}" > ${reactionCounter} reactions
      </p>
      <p id = "count-comment" class="${(reactionCounter === 0) ? 'count-comment' : 'count-comment-right'}"></p>     
      <hr>
      </section>
      <button type="button" id="btn-like" class="btn-like-plane ${(objPost.likes.indexOf(userId) === -1) ? 'inactive-reaction' : 'active-reaction'}"><i class="fa fa-thumbs-up"></i> Like </button>
      <button type="button" id="btn-comment" class="btn-comment"><i class="fa fa-comment"></i>Comment </button>
    </div>
    <section id ="container-comment" class="hide">
      <form class="div-comment formComment">
        <textarea class="comment" placeholder="Agrega un comentario" required></textarea>
        <button type="submit" class="fas fa-paper-plane"></button>
      </form>
      <div id = "container-AllComment"></div>
    </section>  
  </div>
</div>
<section class="modal-progress">
<div class="alert">
  <p id="messageAlert"></p>
  <section class="directionRow">
  <i class="fas fa-times-circle" id="closeModal"></i>
  <i class="fas fa-check" id="deleteModal"></i>
  </section>
</div>
</section>
`;
      getUserData(objPost.userId)
        .then((doc) => {
          const avatarPhoto = postElement.querySelector('.avatar-post');
          const username = postElement.querySelector('.username');
          const nametooltip = postElement.querySelector('.nametooltip');
          const tooltipimg = postElement.querySelector('.tooltipimg');
          avatarPhoto.src = doc.data().photo;
          tooltipimg.src = doc.data().photo;
          username.textContent = doc.data().username;
          nametooltip.textContent = doc.data().username.toUpperCase();
        });

      /* ---------------- Menu despegable --------------------------*/
      const btnMenu = postElement.querySelector('.btn-menu-post');
      btnMenu.addEventListener('click', () => {
        postElement.querySelector('#menu-post-content').style.display = 'block';
      });
      // cerrar con click por fuera
      window.addEventListener('click', (e) => {
        if (e.target !== btnMenu) {
          postElement.querySelector('#menu-post-content').style.display = 'none';
        }
      });
      /* -------------- editar el menu -------------------*/
      const editPost = postElement.querySelector('#edit-post');
      const editPublication = postElement.querySelector('.edit-text');
      const btnSaveEdit = postElement.querySelector(`.btn-save-edit-${objPost.id}`);
      const btnCancelEdit = postElement.querySelector('.btn-cancel-edit');
      // editar post
      editPost.addEventListener('click', () => {
        if (userId === objPost.userId) {
          postElement.querySelector('.edit-text-post').style.display = 'block';
        } else {
          const enterModal = postElement.querySelector('.modal-progress');
          const textModal = postElement.querySelector('#messageAlert');
          enterModal.classList.add('showModal');
          textModal.textContent = 'No puedes editar un post de otro usuario';
          const closeModal = postElement.querySelector('#closeModal');
          closeModal.addEventListener('click', () => {
            enterModal.classList.remove('showModal');
          });
        }
      });

      // actualizar post
      btnSaveEdit.addEventListener('click', () => {
        if (editPublication.value !== '') {
          upgradePost(objPost.id, editPublication.value);
        } else {
          const enterModal = postElement.querySelector('.modal-progress');
          const textModal = postElement.querySelector('#messageAlert');
          enterModal.classList.add('showModal');
          textModal.textContent = 'Espacio Vacío';
          const closeModal = postElement.querySelector('#closeModal');
          closeModal.addEventListener('click', () => {
            enterModal.classList.remove('showModal');
          });
        }
      });
      // cancelar post
      btnCancelEdit.addEventListener('click', () => {
        postElement.querySelector('.edit-text-post').style.display = 'none';
        editPublication.value = objPost.publication;
      });

      // borrar post
      postElement.querySelector(`#delete-post-${objPost.id}`)
        .addEventListener('click', () => {
          if (userId === objPost.userId) {
            const enterModal = postElement.querySelector('.modal-progress');
            const textModal = postElement.querySelector('#messageAlert');
            const deletePublication = postElement.querySelector('#deleteModal');
            const directionRow = postElement.querySelector('.directionRow');
            enterModal.classList.add('showModal');
            deletePublication.style.display = 'block';
            directionRow.style.display = 'flex';
            textModal.textContent = 'Estas seguro que deseas eliminar el post?';
            const closeModal = postElement.querySelector('#closeModal');
            closeModal.addEventListener('click', () => {
              enterModal.classList.remove('showModal');
            });
            deletePublication.addEventListener('click', () => {
              removePost(objPost.id);
              enterModal.classList.remove('showModal');
            });
          } else {
            const enterModal = postElement.querySelector('.modal-progress');
            const textModal = postElement.querySelector('#messageAlert');
            enterModal.classList.add('showModal');
            textModal.textContent = 'No puedes eliminar un post de otro usuario';
            const closeModal = postElement.querySelector('#closeModal');
            closeModal.addEventListener('click', () => {
              enterModal.classList.remove('showModal');
            });
          }
        });
      // actualizarlikes
      const likes = postElement.querySelector('#btn-like');
      likes.addEventListener('click', () => {
        const result = objPost.likes.indexOf(userId);
        if (result === -1) {
          objPost.likes.push(userId);
          upgradeLike(objPost.id, objPost.likes);
        } else {
          objPost.likes.splice(result, 1);
          upgradeLike(objPost.id, objPost.likes);
        }
      });
      /* ------------Mostrar y ocultar comentario ------------------*/
      postElement.querySelector('#btn-comment').addEventListener('click', () => {
        postElement.querySelector('#btn-comment').classList.toggle('btn-comment-active');
        postElement.querySelector('#container-comment').style.display = 'block';
      });

      /* ---------------------- agregar POST al clound------------------*/
      const formComment = postElement.querySelector('.formComment');
      formComment.addEventListener('submit', (e) => {
        const comment = postElement.querySelector('.comment').value;
        e.preventDefault();
        commentAdd(user.uid, objPost.id, comment)
          .then(() => {
            formComment.reset();
          });
      });
      /* ---------------------- GET comentarios de container------------------*/
      const containerAllComment = postElement.querySelector('#container-AllComment');
      const counterComment = postElement.querySelector('#count-comment');
      getComment(objPost.id, (comment) => {
        containerAllComment.innerHTML = '';
        comment.forEach((objComment) => {
          containerAllComment.appendChild(itemComment(objComment, objPost.id));
        });
        counterComment.textContent = `${(comment.length !== 0) ? `${comment.length} comments` : ''}`;
      });
    } else {
      window.location.hash = '#/';
    }
  };

  currentUser(isUser);
  return postElement;
};

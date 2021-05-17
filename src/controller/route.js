import { components } from '../view/index.js';
import { getUserData } from '../js/firestore.js';
import { currentUser } from '../js/auth.js';

const changeView = (route) => {
  const container = document.querySelector('#container');
  window.location.hash = route;
  container.innerHTML = '';
  switch (route) {
    case '#':
    case '#/':
    case '': {
      container.appendChild(components.login());
      break;
    }
    case '#/registrate': {
      container.appendChild(components.check());
      break;
    }
    case '#/home': {
      currentUser((user) => {
        getUserData(user.uid)
          .then((doc) => {
            container.appendChild(components.home(doc.data()));
          }).catch((error) => {
            console.log(error);
          });
      });
      break;
    }
    case '#/profile': {
      currentUser((user) => {
        getUserData(user.uid)
          .then((doc) => {
            container.appendChild(components.profile(doc.data()));
          }).catch((error) => {
            console.log(error);
          });
      });
      break;
    }
    default:
      container.appendChild(components.viewDifferent());
      break;
  }
  return 0;
};

export { changeView };

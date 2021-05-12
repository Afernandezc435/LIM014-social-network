// En este fichero creamos un objeto para exportar todas las vistas
import Login from './login.js';
import Check from './check.js';
import viewHome from './home.js';
import Profile from './profile.js';
import ViewDifferent from './404.js';

const components = {
  login: Login,
  check: Check,
  home: viewHome,
  profile: Profile,
  viewDifferent: ViewDifferent,
};

export { components };

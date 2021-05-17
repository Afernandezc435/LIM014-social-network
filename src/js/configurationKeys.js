// Key Firebase
export default () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAx03IvI8hKW20-SdP_YorRdLAJm_RVtOc',
    authDomain: 'wartay-de3d8.firebaseapp.com',
    projectId: 'wartay-de3d8',
    storageBucket: 'wartay-de3d8.appspot.com',
    messagingSenderId: '324582871493',
    appId: '1:324582871493:web:18dac299050699817d3bac',
    measurementId: 'G-RT0YE0YE3D',
  };
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
};

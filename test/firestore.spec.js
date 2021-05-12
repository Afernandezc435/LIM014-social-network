// importamos la funcion que vamos a testear
import MockFirebase from 'mock-cloud-firestore';
import {
  userData,
  getUserData,
  updateCurrentUser,
  postAdd,
  getPost,
  commentAdd,
  getComment,
  upgradePost,
  removePost,
  removeComment,
  profilePhoto,
  coveragePhoto,
  upgradeLike,
  upgradeComment,

} from '../src/js/firestore';
// Collection Firebase mock
const fixtureData = {
  __collection__: {
    SN_Users: {
      __doc__: {
        uid_002: {
          email: 'kelmita22@gmail.com',
          photo: '',
          photoCover: '',
          profesión: 'Profesión',
          username: 'Kelly Marquez',
        },
      },
    },
    wartay: {
      __doc__: {
        id_001: {
          date: '',
          likes: '',
          publication: 'Publicaciones',
          urlimg: '',
          userId: '001',

          SN_Comment: {
            __doc__: {
              id_001: {
                comment: 'Hola chicos',
                date: '5/5/2021 13:26:57',
                userId: '001',
              },
            },
          },
        },
        post_001: {
          date: '',
          likes: [],
          publication: 'Publicaciones',
          urlimg: '',
          userId: 'uid_002',
          __collection__: {
            SN_Comment: {
              __doc__: {
                comment_001: {
                  comment: '1',
                  userId: 'uid_002',
                  date: '10/5/2021 21:27:28',

                },
              },
            },
          },
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

// Función userData
describe('función userData', () => {
  it('Deberia ser una función', () => {
    expect(typeof userData).toBe('function');
    expect(typeof getUserData).toBe('function');
  });
  it('Deberia crear un nuevo usuario', () => {
    const currentUser = {
      uid: 'uid_001',
      displayName: 'Kelly',
      photoURL: 'prueba.jpg',
      email: 'kelmita22@gmail.com',
    };
    const current = {
      uid: 'uid_002',
      displayName: null,
      photoURL: null,
      email: 'kelmita22@gmail.com',
    };
    userData(currentUser)
      .then(() => {
        getUserData('uid_001')
          .then((doc) => {
            expect(doc.data().email).toEqual('kelmita22@gmail.com');
            expect(doc.data().username).toEqual('Kelly');
            expect(doc.data().photo).toEqual('prueba.jpg');
          });
      });
    userData(current)
      .then(() => {
        getUserData('uid_002')
          .then((doc) => {
            expect(doc.data().username).toEqual('User');
            expect(doc.data().photo).toEqual('./imageProject/avatar.png');
          });
      });
  });
});

// Función updateCurrentUser
describe('función updateCurrentUser', () => {
  it('Deberia ser una función', () => {
    expect(typeof updateCurrentUser).toBe('function');
  });
  it('Deberia actualizar los datos del usuario', (done) => updateCurrentUser('uid_001', 'Kelly', '', '', '', '')
    .then(() => {
      getUserData('uid_001')
        .then((doc) => {
          expect(doc.data().username).toBe('Kelly');
          done();
        });
    }));
});
// Función postAdd
describe('Función postAdd', () => {
  it('Deberia ser una función', () => {
    expect(typeof postAdd).toBe('function');
    expect(typeof getPost).toBe('function');
  });
  it('Deberia crear un post', (done) => postAdd('uid_001', 'Kelly', '', '', '')
    .then(() => getPost(
      (data) => {
        const result = data.find((post) => post.publication === 'Publicaciones');
        expect(result.publication).toBe('Publicaciones');
        done();
      },
    )));
});
// Función commentAdd
describe('Función commentAdd', () => {
  it('Deberia ser una función', () => {
    expect(typeof commentAdd).toBe('function');
    expect(typeof getComment).toBe('function');
  });
  it('Deberia agregar una nuevo comentario', (done) => commentAdd('uid_001', 'id_001', 'Hola')
    .then(() => getComment('id_001',
      (data) => {
        const result = data.find((comment) => comment.comment === 'Hola');
        expect(result.comment).toBe('Hola');
        done();
      })));
});
// Función upgradePost
describe('Función upgradePost', () => {
  it('Deberia ser una función', () => {
    expect(typeof upgradePost).toBe('function');
  });
  it('Deberia actualizar información del post', (done) => upgradePost('id_001', 'Hola chicos')
    .then(() => getPost(
      (data) => {
        const result = data.find((post) => post.publication === 'Hola chicos');
        expect(result.publication).toBe('Hola chicos');
        done();
      },
    )));
});
// Función removePost
describe('Función removePost', () => {
  it('Deberia ser una función', () => {
    expect(typeof removePost).toBe('function');
  });
  it('Debería poder borrar el post', () => removePost()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
// Función removeComment
describe('Función removeComment', () => {
  it('Deberia ser una función', () => {
    expect(typeof removeComment).toBe('function');
  });
  it('Debería poder borrar el comentario', () => removeComment()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
// Función profilePhoto
describe('Función profilePhoto', () => {
  it('Deberia ser una función', () => {
    expect(typeof profilePhoto).toBe('function');
  });
  it('Debería poder actualizar de foto de perfil', () => profilePhoto('uid_002', './imageProject/avatar.png')
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
// Función coveragePhoto
describe('Función coveragePhoto', () => {
  it('Deberia ser una función', () => {
    expect(typeof coveragePhoto).toBe('function');
  });
  it('Debería poder actualizar de foto del cover', () => coveragePhoto('uid_002', './imageProject/avatar.png')
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});

// Función upgradeLike
describe('Función upgradeLike', () => {
  it('Deberia ser una función', () => {
    expect(typeof upgradeLike).toBe('function');
  });
  it('Debería poder actualizar los likes del post', () => upgradeLike('post_001', [])
    .then((post) => {
      expect(post).toBe(undefined);
    }));
});
// Función upgradeComment
describe('Función upgradeComment', () => {
  it('Deberia ser una función', () => {
    expect(typeof upgradeComment).toBe('function');
  });

  it('Deberia actualizar información del comentario', (done) => upgradeComment('post_001', 'comment_001', 'Hola chicos')
    .then(() => getComment('post_001', (data) => {
      const result = data.find((post) => post.comment === 'Hola chicos');
      expect(result.comment).toBe('Hola chicos');
      done();
    })));
});

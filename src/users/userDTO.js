const db = require('../../database');
const { InternalServerError } = require('../erros');

module.exports = {
  add: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          INSERT INTO users (
            name,
            email,
            password
          ) VALUES (?, ?, ?)
        `,
        [user.name, user.email, user.password],
        erro => {
          if (erro) {
            reject(new InternalServerError('Error adding user!'));
          }

          return resolve();
        }
      );
    });
  },

  findById: id => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE id = ?
        `,
        [id],
        (erro, user) => {
          if (erro) {
            return reject('User could not be found!');
          }

          return resolve(user);
        }
      );
    });
  },

  findByEmail: email => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE email = ?
        `,
        [email],
        (erro, user) => {
          if (erro) {
            return reject('User could not be found!');
          }

          return resolve(user);
        }
      );
    });
  },

  list: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `
          SELECT * FROM users
        `,
        (erro, users) => {
          if (erro) {
            return reject('Error listing users');
          }
          return resolve(users);
        }
      );
    });
  },

  delete: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          DELETE FROM users
          WHERE id = ?
        `,
        [user.id],
        erro => {
          if (erro) {
            return reject('Error deleting user');
          }
          return resolve();
        }
      );
    });
  }
}; 
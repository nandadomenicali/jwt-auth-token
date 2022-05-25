const controller = require('./users-controller');

module.exports = app => {
  app
    .route('/user')
    .post(controller.add)
    .get(controller.list);

  app.route('/user/:id').delete(controller.delete);
}; 
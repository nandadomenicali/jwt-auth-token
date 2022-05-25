const controller = require('./posts-controller');

module.exports = app => {
  app
    .route('/post')
    .get(controller.list)
    .post(controller.add);
};
const postsDTO = require('./postsDTO');
const validations = require('../validations'); 

class Post {
  constructor(post) {
    this.title = post.title;
    this.content = post.content;
    this.check();
  }

  add() {
    return postsDTO.add(this);
  }

  check() {
    validations.notNull(this.title, 'title');
    validations.minSize(this.title, 'title', 5);

    validations.notNull(this.content, 'content');
    validations.maxSize(this.content, 'content', 140);
  }

  static list() {
    return postsDTO.list();
  } 
}
 
module.exports = Post;
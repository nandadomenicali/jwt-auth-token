const Post = require('./posts-model');
const { InvalidArgumentError, InternalServerError } = require('../erros');

module.exports = {
  add: async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.add();
      
      res.status(201).send(post);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  list: async (req, res) => {
    try {
      const posts = await Post.list();
      res.send(posts);
    } catch (erro) {
      return res.status(500).json({ erro: erro });
    }
  }
};
const User = require('./users/model');
const { InvalidArgumentError, InternalServerError } = require('../erros');

module.exports = {
  adiciona: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = new User({
        name,
        email,
        password
      });

      await user.adiciona();

      res.status(201).json();
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

  lista: async (req, res) => {
    const users = await User.lista();
    res.json(users);
  },

  deleta: async (req, res) => {
    const user = await User.buscaPorId(req.params.id);
    try {
      await user.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
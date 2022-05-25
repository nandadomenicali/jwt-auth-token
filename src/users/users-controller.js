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

      await user.add();

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

  list: async (req, res) => {
    const users = await User.list();
    res.json(users);  
  },

  delete: async (req, res) => {
    const user = await User.findById(req.params.id); 
    try {
      await user.delete(); 
      res.status(200).send(); 
    } catch (erro) {
      res.status(500).json({ error: error });
    }
  }
};
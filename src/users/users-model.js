const userDTO = require('./userDTO.js');
const { InvalidArgumentError } = require('../erros');
const validations = require('../validations');
 
class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;

    this.check();
  } 

  async add() {
    if (await User.findByEmail(this.email)) { 
      throw new InvalidArgumentError('User already exists!');
    }
 
    return userDTO.add(this);
  }

  check() {
    validations.notNull(this.name, 'name');
    validations.notNull(this.email, 'email');
    validations.notNull(this.password, 'password');
    validations.minSize(this.password, 'password', 8);  
    validations.maxSize(this.password, 'password', 64);
  }
 
  
  async delete() {
    return userDTO.delete(this); 
  } 
    
  static async findById(id) {
    const user = await userDTO.findById(id);
    if (!user) {
      return null;
    }
     
    return new User(user); 
  }
   
  static async findByEmail(email) {
    const user = await userDTO.findByEmail(email);
    if (!user) {
      return null;
    }
    
    return new User(user);
  }
 
  static list() {
    return userDTO.list();
  }
}
 
module.exports = User;  
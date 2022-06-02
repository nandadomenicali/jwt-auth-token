const userDTO = require('./userDTO.js');
const { InvalidArgumentError } = require('../utils/erros');
const validations = require('../validations');
const bcrypt = require('bcrypt '); 
class User {
  constructor(user) {
    this.id = user.id; 
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;

    this.check(); 
  } 

  async add() {
    if (await User.findByEmail(this.email)) { 
      throw new InvalidArgumentError('User already exists!');
    }
 
    return userDTO.add(this);
  }

  async addPassword(password){ 
    validations.notNull(password, 'password');
    validations.minSize(password, 'password', 8);  
    validations.maxSize(password, 'password', 64);  
    
    this.passwordHash = await User.generatePasswordHash(password);
  }
 
  check() {
    validations.notNull(this.name, 'name');
    validations.notNull(this.email, 'email');
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

  static generatePasswordHash(password){
    const coastHash = 12; 
    return bcrypt.hash(password, coastHash) 
  }
}
 
module.exports = User;   
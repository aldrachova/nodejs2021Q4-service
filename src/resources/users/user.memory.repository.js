const User = require('./user.model');

let users = [];

const getAll = () => users;

const getById = (id) => users.find(user => user.id === id);

const create = (name, login, password) => {
  const newUser = new User(name, login, password);
  users = [...users, newUser];
  return newUser;
}

const updateById = (id, name, login, password) => {
  users = users.map(user => (user.id === id ? { id, name, login, password } : user));
  const updatedUser = getById(id);
  return updatedUser;
}

const deleteById = (id) => {
  users = users.filter(user => user.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};

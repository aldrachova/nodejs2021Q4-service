const userRepository = require('./user.memory.repository');
const { unassignTasks } = require('../tasks/task.service');

const getAllUsers = async (request, reply) => {
  const users = await userRepository.getAll();
  reply.code(200).send(users);
}

const getUserById = async (request, reply) => {
  const {id} = request.params;
  const user = await userRepository.getById(id);
  reply.code(200).send(user);
}

const createUser = async (request, reply) => {
  const { name, login, password } = request.body;
  const user = await userRepository.create(name, login, password);
  reply.code(201).send(user);
}

const updateUserById = async (request, reply) => {
  const {id} = request.params;
  const { name, login, password } = request.body;
  const user = await userRepository.updateById(id, name, login, password);
  reply.code(200).send(user);
}

const deleteUserById = async (request, reply) => {
  const { id } = request.params;
  await unassignTasks(id);
  await userRepository.deleteById(id);
  reply.send({ message: `User ${id} has been deleted`});
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}
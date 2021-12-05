const taskRepository = require('./task.memory.repository');

const getAllTasks = async (request, reply) => {
  const tasks = await taskRepository.getAll();
  reply.code(200).send(tasks);
}

const getTaskById = async (request, reply) => {
  const { id } = request.params;
  const task = await taskRepository.getById(id);
  reply.code(200).send(task);
}

const createTask = async (request, reply) => {
  const { title, order, description, userId, boardId, columnId } = request.body;
  const task = await taskRepository.create(title, order, description, userId, boardId, columnId);
  reply.code(201).send(task);
}

const updateTaskById = async (request, reply) => {
  const { id } = request.params;
  const { title, order, description, userId, boardId, columnId } = request.body;
  const task = await taskRepository.updateById(id, title, order, description, userId, boardId, columnId);
  reply.code(200).send(task);
}

const deleteTaskById = async (request, reply) => {
  const { id } = request.params;
  await taskRepository.deleteById(id);
  reply.send({ message: `Task ${id} has been deleted`});
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById
}
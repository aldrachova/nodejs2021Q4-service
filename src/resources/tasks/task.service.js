const taskRepository = require('./task.memory.repository');

const getAllTasks = async (request, reply) => {
  const tasks = await taskRepository.getAll();
  reply.code(200).send(tasks);
}

const getTaskById = async (request, reply) => {
  const { id } = request.params;
  const task = await taskRepository.getById(id);
  if (task) {
    reply.code(200).send(task);
  } else {
    reply.code(404).send(new Error(`Task ${id} not found`));
  }
  
}

const createTask = async (request, reply) => {
  const { title, order, description, userId, columnId } = request.body;
  const boardId = request.url.split('/')[2];
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

const deleteBoardTasks = async (boardId) => {
  await taskRepository.deleteByBoardId(boardId);
}

const unassignTasks = async (userId) => {
  await taskRepository.unassign(userId);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  deleteBoardTasks,
  unassignTasks
}
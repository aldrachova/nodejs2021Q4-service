const Task = require('./task.model');

let tasks = [];

const getAll = () => tasks;

const getById = (id) => tasks.find(task => task.id === id);

const create = (title, order, description, userId, boardId, columnId) => {
  const newTask = new Task(title, order, description, userId, boardId, columnId);
  tasks = [...tasks, newTask];
  return newTask;
}

const updateById = (id, title, order, description, userId, boardId, columnId) => {
  tasks = tasks.map(task => (task.id === id ? { id, title, order, description, userId, boardId, columnId} : task));
  const updatedTask = getById(id);
  return updatedTask;
}

const deleteById = (id) => {
  tasks = tasks.filter(task => task.id !== id);
}

const unassign = (userId) => {
  tasks = tasks.map(task => (task.userId === userId ? updateById(task.id, task.title, task.order, task.description, null, task.boardId, task.columnId) : task));
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  unassign
};

const boardRepository = require('./board.memory.repository');
const { deleteBoardTasks } = require('../tasks/task.service');

const getAllBoards = async (request, reply) => {
  const boards = await boardRepository.getAll();
  reply.code(200).send(boards);
}

const getBoardById = async (request, reply) => {
  const { id } = request.params;
  const board = await boardRepository.getById(id);
  if(board) {
    reply.code(200).send(board);
  } else {
    reply.code(404).send(new Error(`Board ${id} not found`));
  }
}

const createBoard = async (request, reply) => {
  const { title, columns } = request.body;
  const board = await boardRepository.create(title, columns);
  reply.code(201).send(board);
}

const updateBoardById = async (request, reply) => {
  const { id } = request.params;
  const { title, columns } = request.body;
  const board = await boardRepository.updateById(id, title, columns);
  reply.code(200).send(board);
}

const deleteBoardById = async (request, reply) => {
  const { id } = request.params;
  await deleteBoardTasks(id);
  await boardRepository.deleteById(id);
  reply.code(200).send({ message: `Board ${id} has been deleted`});
}

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoardById,
  deleteBoardById
}
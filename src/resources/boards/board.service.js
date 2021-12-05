const boardRepository = require('./board.memory.repository');

const getAllBoards = async (request, reply) => {
  const boards = await boardRepository.getAll();
  reply.code(200).send(boards);
}

const getBoardById = async (request, reply) => {
  const { id } = request.params;
  const board = await boardRepository.getById(id);
  reply.code(200).send(board);
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
  await boardRepository.deleteById(id);
  reply.send({ message: `Board ${id} has been deleted`});
}

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoardById,
  deleteBoardById
}
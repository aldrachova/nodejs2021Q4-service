const Board = require('./board.model');

let boards = [];

const getAll = () => boards;

const getById = (id) => boards.find(board => board.id === id);

const create = (title, columns) => {
  const newBoard = new Board(title, columns);
  boards = [...boards, newBoard];
  return newBoard;
}

const updateById = (id, title, columns) => {
  boards = boards.map(board => (board.id === id ? { id, title, columns} : board));
  const updatedBoard = getById(id);
  return updatedBoard;
}

const deleteById = (id) => {
  boards = boards.filter(board => board.id !== id);
  console.log(boards);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};

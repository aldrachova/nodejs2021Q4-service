const { getAllBoards, getBoardById, createBoard, updateBoardById, deleteBoardById } = require('./board.service');


const column = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
  }
};

const board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { type: 'array',
      columns: column },
  }
}

const getBoardsOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        boards: board,
      },
    },
  },
  handler: getAllBoards,
}

const getBoardOptions = {
  schema: {
    response: {
      200: board,
    },
  },
  handler: getBoardById,
}

const postBoardOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: { type: 'array' },
      },
    },
    response: {
      201: board,
    },
  },
  handler: createBoard,
}

const updateBoardOptions = {
  schema: {
    response: {
      200: board,
    },
  },
  handler: updateBoardById,
}

const deleteBoardOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteBoardById,
}

const boardRoutes = async (fastify, options, done) => {
  fastify.get('/boards', getBoardsOptions);
  fastify.get('/boards/:id', getBoardOptions);
  fastify.post('/boards', postBoardOptions);
  fastify.put('/boards/:id', updateBoardOptions);
  fastify.delete('/boards/:id', deleteBoardOptions);
  done();
}

module.exports = boardRoutes;
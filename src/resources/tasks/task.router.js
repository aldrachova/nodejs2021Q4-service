const { getAllTasks, getTaskById, createTask, updateTaskById, deleteTaskById } = require('./task.service');

const task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    order: { type: 'number' },
    userId: { type: ['null','string'] },
    boardId: { type: ['null','string'] },
    columnId: { type: ['null','string'] },
  }
}

const getTasksOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        tasks: task,
      },
    },
  },
  handler: getAllTasks,
}

const getTaskOptions = {
  schema: {
    response: {
      200: task,
    },
  },
  handler: getTaskById,
}

const postTaskOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'description', 'userId', 'boardId', 'columnId'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        userId: { type: 'string' },
        boardId: { type: 'string' },
        columnId: { type: 'string' },
      },
    },
    response: {
      201: task,
    },
  },
  handler: createTask,
}

const updateTaskOptions = {
  schema: {
    response: {
      200: task,
    },
  },
  handler: updateTaskById,
}

const deleteTaskOptions = {
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
  handler: deleteTaskById,
}

const taskRoutes = async (fastify, options, done) => {
  fastify.get('/boards/:id/tasks', getTasksOptions);
  fastify.get('/boards/:id/tasks/:id', getTaskOptions);
  fastify.post('/boards/:id/tasks', postTaskOptions);
  fastify.put('/boards/:id/tasks/:id', updateTaskOptions);
  fastify.delete('/boards/:id/tasks/:id', deleteTaskOptions);
  done();
}

module.exports = taskRoutes;
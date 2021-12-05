const { getAllUsers, getUserById, createUser, updateUserById, deleteUserById } = require('./user.service');

const user = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    login: {type: 'string'},
  }
}

const getUsersOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        users: user
      },
    },
  },
  handler: getAllUsers,
}

const getUserOptions = {
  schema: {
    response: {
      200: user,
    },
  },
  handler: getUserById,
}

const postUserOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string'},
        password: {type: 'string'},
      },
    },
    response: {
      201: user,
    },
  },
  handler: createUser,
}

const updateUserOptions = {
  schema: {
    response: {
      200: user,
    },
  },
  handler: updateUserById,
}

const deleteUserOptions = {
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
  handler: deleteUserById,
}

const userRoutes = async (fastify, options, done) => {
  fastify.get('/users', getUsersOptions);
  fastify.get('/users/:id', getUserOptions);
  fastify.post('/users', postUserOptions);
  fastify.put('/users/:id', updateUserOptions);
  fastify.delete('/users/:id', deleteUserOptions);
  done();
}

module.exports = userRoutes;

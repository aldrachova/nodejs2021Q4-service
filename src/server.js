const fastify = require('fastify')({logger: true});
const { PORT } = require('./common/config');

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'REST service' },
  }
});

fastify.register(require('./resources/users/user.router'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    process.exit(1);
  }
};

start();

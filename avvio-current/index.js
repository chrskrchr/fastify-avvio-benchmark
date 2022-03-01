const fastify = require('fastify')

async function create(register){
    const fastifyInstance = fastify({
        logger: true
    });

    await register(fastifyInstance);

    await fastifyInstance.listen(3000);

    return fastifyInstance;
}

module.exports = create;
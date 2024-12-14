"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    const message = process.env.TEST_ENV_VARIABLE;
    return message;
  });
};

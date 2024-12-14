"use strict";

const fp = require("fastify-plugin");

module.exports = fp(function (fastify, opts, next) {
  fastify.addSchema(require("./user-input-headers.json"));
});
"use strict";

const path = require("node:path");
const AutoLoad = require("@fastify/autoload");

// Pass --options via CLI arguments in command to enable these options.
const options = {};

module.exports = async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "schemas"),
    indexPattern: /^loader.js$/i,
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    ignorePattern: /.*.no-load\.js/,
    indexPattern: /^no$/i,
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    indexPattern: /.*routes(\.js|\.cjs)$/i,
    ignorePattern: /.*\.js/,
    autoHooksPattern: /.*hooks(\.js|\.cjs)$/i,
    // The autoHooks flag lets you register some hooks for every routes.js file.
    autoHooks: true,
    // The cascadeHooks option also turns this feature on for the subdirectories
    cascadeHooks: true,
    options: { ...opts },
  });
};

module.exports.options = options;

'use strict';

// Load modules

const path = require('path');
const glob = require('glob');
const Joi = require('joi');

// Declare internals

const internals = {};

internals.schema = Joi.object().keys({
  name: Joi.string().required(),
  path: Joi.string().required(),
  extension: Joi.string().regex(/\.[0-9a-z]+$/i)
});

internals.load = (options, callback) => {

  options = options || {};
  options.extension = options.extension || '.js';
  var modules = {};

  var files = glob.sync('*' + options.extension, { cwd: options.path || __dirname });
  for (let i in files) {
    let key = path.basename(files[i], options.extension);
    key = key.charAt(0).toUpperCase() + key.slice(1);
    modules[key] = require((options.path || __dirname) + '/' + files[i]);
  }

  return callback(modules);
};

exports.expose = (options, plugin, next) => {
  Joi.assert(options, internals.schema, 'Invalid options');

  internals.load(options, handlers => {
    plugin.expose(options.name, handlers);
    next();
  });
};
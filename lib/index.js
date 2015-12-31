'use strict';

// Load modules

const glob = require('glob');
const path = require('path');

// Declare internals

const internals = {};

internals.load = (options, callback) => {

  options = options || {};
  options.extension = options.extension || '.js';
  var modules = {};

  var files = glob.sync('*' + options.extension, { cwd: options.path || __dirname });
  for (let i in files) {
    if (files[i] != path.basename(__filename)) {
      let key = path.basename(files[i], options.extension);
      key = key.charAt(0).toUpperCase() + key.slice(1);

      modules[key] = require((options.path || __dirname) + '/' + files[i]);
    }
  }

  return callback(null, modules);
};

exports.expose = (options, name, plugin, next) => {
  internals.load(options, (err, handlers) => {
    if (err) {
      throw err;
    }

    plugin.expose(name, handlers);
    next();
  });
};
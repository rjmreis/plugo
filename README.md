[![npm](https://img.shields.io/npm/v/plugo.svg)](https://www.npmjs.com/package/plugo)
[![Build Status](https://secure.travis-ci.org/rjmreis/plugo.svg)](http://travis-ci.org/rjmreis/plugo)
[![Dependencies Status](https://david-dm.org/rjmreis/plugo.svg)](https://david-dm.org/rjmreis/plugo)
[![DevDependencies Status](https://david-dm.org/rjmreis/plugo/dev-status.svg)](https://david-dm.org/rjmreis/plugo#info=devDependencies)

# plugo
Dynamically expose modules to hapi plugins from a given path.

## Usage
```javascript
const Plugo = require('plugo');

exports.register = (plugin, options, next) => {
  // Exposes modules in the handlers folder to this plugin
  Plugo.expose({ name: 'handlers', path: __dirname + '/handlers' }, plugin, next);
};

exports.register.attributes = {
  name: 'controllers'
};
```

## Options
The following options are available:
* `name`: Defines name for plugins [*required*]
* `path`: Specifies which folder to load files [*required*]
* `extension`: Specifies which file extension to look for (defaults to .js)

[![npm](https://img.shields.io/npm/v/plugo.svg)](https://www.npmjs.com/package/plugo)
[![Build Status](https://secure.travis-ci.org/rjmreis/plugo.svg)](http://travis-ci.org/rjmreis/plugo)

# plugo
Dynamically expose modules to hapi plugins from a given path.

## Usage
```javascript
const Plugo = require('plugo');

exports.register = (plugin, options, next) => {
  var plugoptions = {
    name: 'handlers',
    path: __dirname + '/handlers'
  };
  
  // Exposes modules in the handlers folder to this plugin
  Plugo.expose(plugoptions, plugin, next);
};

exports.register.attributes = {
  name: 'controllers'
};
```

## Options
The following options are available:
* `name`: Defines property name under plugin [`required`]
* `path`: Specifies which folder to load files [`required`]
* `extension`: Specifies which file extension to look for (defaults to .js) [`optional`]

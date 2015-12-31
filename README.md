[![npm](https://img.shields.io/npm/v/plugo.svg)](https://www.npmjs.com/package/plugo)
[![Build Status](https://secure.travis-ci.org/rjmreis/plugo.svg)](http://travis-ci.org/rjmreis/plugo)
[![Dependencies Status](https://david-dm.org/rjmreis/plugo.svg)](https://david-dm.org/rjmreis/plugo)
[![DevDependencies Status](https://david-dm.org/rjmreis/plugo/dev-status.svg)](https://david-dm.org/rjmreis/plugo#info=devDependencies)

# plugo
Dynamically expose hapi plugins from a given path

## Usage
```javascript
const Plugo = require('plugo');

exports.register = (plugin, options, next) => {
  Plugo.expose({ path: __dirname + '/handlers' }, 'handlers', plugin, next);
};

exports.register.attributes = {
  name: 'controllers'
};
```

## Options
The following options are available:
* `path`: Specifies which folder to load files
* `extension`: Specifies which file extension to look for (defaults to .js)

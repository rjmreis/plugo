'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Hapi = require('hapi');
const Plugo = require('..');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const internals = {};

internals.prepareServer = function (plugopt, callback) {

  var server = new Hapi.Server();
  server.connection({ labels: ['api'] });
  server.connection();

  var api = {
    register: (plugin, options, next) => {
      Plugo.expose(plugopt, plugin, next);
    }
  };

  api.register.attributes = {
    name: 'api'
  };

  server.register([api], { select: 'api' }, function (err) {
    expect(err).to.not.exist();
    return callback(server);
  });

  server.start(err => {
    expect(err).to.not.exist();
  });
};

describe('expose()', () => {
  it('Should create server and register handlers plugin', done => {
    internals.prepareServer({ name: 'handlers', path: __dirname + '/handlers' }, server => {
      setTimeout(function () {
        expect(server).to.exist();
        expect(server.plugins['api']['handlers']).to.exist();
        expect(server.plugins['api']['handlers']).to.not.be.empty();
        
        done();
      }, 20);
    });
  });
  
  it('Should throw error if passed options are invalid', done => {
    expect(() => {
      internals.prepareServer({ path: __dirname + '/handlers' }, server => {});
    }).to.throw();
    
    done();
  });
});
import chai, { expect } from 'chai';
import Pluggable from '../src/pluggable';
import path from 'path';

describe('Pluggable', function () {

  it('should throw an error', function () {
    expect(() => {
      new Pluggable();
    }).to.throw('plugins object not provided');
  });

  it('should throw error if webpack.config is not found', function () {
    var pl = new Pluggable({
      ca: 'plugin-test'
    });    
    var compiler = { options: {} };

    expect(() => {
      pl.apply(compiler);
    }).to.throw('webpack.config.js not found for: plugin-test');
  });

  it('should create alias to entry point', function () {
    var pl = new Pluggable({
      ca: '../test/testpackage'
    });    
    var compiler = { options: {} };

    pl.apply(compiler);
    expect(compiler.options.resolve.alias.ca).to.eql(path.dirname(require.resolve('./testpackage/webpack.config.js')) + '/src/test.js');
  });

  it('should create alias to root dir', function () {
    var pl = new Pluggable({
      ca: '../test/testpackage_mult_entry'
    });    
    var compiler = { options: {} };

    pl.apply(compiler);
    expect(compiler.options.resolve.alias.ca).to.eql(path.dirname(require.resolve('./testpackage_mult_entry/webpack.config.js')));
  });

  it('should merge plugins module loaders', function () {
    var pl = new Pluggable({
      ca: '../test/testpackage'
    });    
    var compiler = { options: {} };
    var pluginConf = require('./testpackage/webpack.config.js');

    pl.apply(compiler);
    expect(compiler.options.module).to.eql(pluginConf.module)
  });
});
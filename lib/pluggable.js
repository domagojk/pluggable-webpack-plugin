'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pluggable = function () {
  function Pluggable(plugins) {
    _classCallCheck(this, Pluggable);

    if (!plugins) {
      throw new Error('plugins object not provided');
    }

    this.plugins = plugins;
  }

  _createClass(Pluggable, [{
    key: 'apply',
    value: function apply(compiler) {

      this._prepareCompiler(compiler);

      for (var alias in this.plugins) {
        var pluginConf;
        var plugin = this.plugins[alias];

        try {
          pluginConf = require(plugin + '/webpack.config.js');
        } catch (e) {
          throw new Error('webpack.config.js not found for: ' + plugin);
        }

        var rootDirectory = _path2.default.dirname(require.resolve(plugin + '/webpack.config.js'));

        if (typeof pluginConf.entry === 'string') {
          compiler.options.resolve.alias[alias] = _path2.default.join(rootDirectory, pluginConf.entry);
        } else {
          compiler.options.resolve.alias[alias] = _path2.default.join(rootDirectory);
        }

        if (pluginConf.module && pluginConf.module.loaders) {
          compiler.options.module.loaders = compiler.options.module.loaders.concat(pluginConf.module.loaders);
        }
      }
    }
  }, {
    key: '_prepareCompiler',
    value: function _prepareCompiler(compiler) {
      if (!compiler.options.resolve) {
        compiler.options.resolve = {};
      }

      if (!compiler.options.resolve.alias) {
        compiler.options.resolve.alias = {};
      }

      if (!compiler.options.module) {
        compiler.options.module = {};
      }

      if (!compiler.options.module.loaders) {
        compiler.options.module.loaders = [];
      }
    }
  }]);

  return Pluggable;
}();

module.exports = Pluggable;
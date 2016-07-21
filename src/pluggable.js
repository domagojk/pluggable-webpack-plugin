import path from 'path';

export default class Pluggable {
  
  constructor(plugins) {
    if (!plugins) {
      throw new Error('plugins object not provided');
    }

    this.plugins = plugins;
  }

  apply(compiler) {

    this._prepareCompiler(compiler);

    for (var alias in this.plugins) {
      var pluginConf;
      var plugin = this.plugins[alias];

      try {
        pluginConf = require(plugin + '/webpack.config.js');
      } catch (e) {
        throw new Error('webpack.config.js not found for: ' + plugin);
      }

      var rootDirectory = path.dirname(require.resolve(plugin + '/webpack.config.js'));

      if (typeof pluginConf.entry === 'string') {
        compiler.options.resolve.alias[alias] = path.join(rootDirectory, pluginConf.entry);
      } else {
        compiler.options.resolve.alias[alias] = path.join(rootDirectory);
      }

      if (pluginConf.module && pluginConf.module.loaders) {
        compiler.options.module.loaders = compiler.options.module.loaders.concat(pluginConf.module.loaders);
      }
    }
  }

  _prepareCompiler(compiler) {
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
}
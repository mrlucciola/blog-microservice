const webpack = require("webpack");
// import webpack from 'webpack';

module.exports = function override(config, _env) {
  config.resolve.fallback = {
    path: false,
    url: false,
    assert: false,
    crypto: false,
    http: false,
    https: false,
    os: false,
    buffer: false,
    stream: false,
    fs: false,
    zlib: false,
    net: false,
    async_hooks: false,
  };
  config.ignoreWarnings = [
    {
      module: /..\/common\/dist\/utils\.js/,
      message: /the request of a dependency is an expression/,
    },
    {
      module: /node_modules\/express\/lib\/view\.js/,
      message: /the request of a dependency is an expression/,
    },
  ];
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const FriendlyErrorsPlugin = require('razzle-dev-utils/FriendlyErrorsPlugin');
const baseConfig = require('./webpack.config.base');

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig(true), {
  watch: !isProd,
  name: 'server',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    NodeExternals({
      whitelist: [...(isProd ? [] : ['webpack/hot/poll?300']), /\.css$/],
    }),
  ],
  entry: [
    ...(isProd
      ? []
      : ['webpack/hot/poll?300', 'razzle-dev-utils/prettyNodeErrors']),
    'reflect-metadata',
    path.resolve('src', 'server', 'index.ts'),
  ],
  output: {
    path: path.resolve('dist'),
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    pathinfo: false,
  },
  plugins: [
    ...(isProd
      ? []
      : [
          new FriendlyErrorsPlugin({
            target: 'server',
            verbose: false,
            onSuccessMessage: 'Your application is running',
          }),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
          new StartServerPlugin({
            name: 'index.js',
            keyboard: true,
          }),
        ]),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});

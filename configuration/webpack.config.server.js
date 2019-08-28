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
      whitelist: isProd ? null : ['webpack/hot/poll?300'],
    }),
  ],
  entry: [
    ...(isProd
      ? []
      : ['razzle-dev-utils/prettyNodeErrors', 'webpack/hot/poll?300']),
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
          new webpack.HotModuleReplacementPlugin(),
          new FriendlyErrorsPlugin({
            target: 'server',
            verbose: false,
            onSuccessMessage: 'Your application is running',
          }),
          new StartServerPlugin({
            name: 'index.js',
          }),
        ]),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});

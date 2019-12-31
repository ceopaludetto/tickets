const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const FriendlyErrorsPlugin = require('razzle-dev-utils/FriendlyErrorsPlugin');

const baseConfig = require('./webpack.config.base');
const envs = require('./envs');

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
      whitelist: [...(isProd ? [] : [`${path.resolve('configuration', 'customLogger')}?300`]), /\.(scss|sass)$/],
    }),
  ],
  entry: [
    ...(isProd ? [] : [`${path.resolve('configuration', 'customLogger')}?300`, 'source-map-support/register']),
    'reflect-metadata',
    path.resolve('src', 'server', 'index.ts'),
  ],
  output: {
    path: path.resolve('dist'),
    publicPath: isProd ? '/static/' : `http://${envs.HOST}:${envs.DEV_PORT}/static/`,
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    pathinfo: false,
  },
  plugins: [
    ...(isProd
      ? []
      : [
          new FriendlyErrorsPlugin({
            onSuccessMessage: `Application will be available in ${envs.PROTOCOL}://${envs.HOST}:${envs.PORT}`,
          }),
          new webpack.HotModuleReplacementPlugin({ quiet: true }),
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

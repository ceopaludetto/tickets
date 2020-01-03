const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NodeExternals = require('webpack-node-externals');

const envs = require('./envs');
const baseConfig = require('./webpack.config.base');

const isProd = process.env.NODE_ENV === 'production';

const nodeArgs = ['-r', 'source-map-support/register'];

if (process.env.INSPECT_BRK) {
  nodeArgs.push(process.env.INSPECT_BRK);
} else if (process.env.INSPECT) {
  nodeArgs.push(process.env.INSPECT);
}

module.exports = merge(baseConfig(true), {
  watch: !isProd,
  name: 'server',
  target: 'node',
  node: {
    __console: false,
    __dirname: false,
    __filename: false,
  },
  externals: [
    NodeExternals({
      whitelist: [...(isProd ? [] : ['webpack/hot/poll?300']), /\.(scss|sass)$/],
    }),
  ],
  entry: [
    ...(isProd ? [] : ['razzle-dev-utils/prettyNodeErrors', 'webpack/hot/poll?300']),
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
            compilationSuccessInfo: {
              messages: [`The application is available in ${envs.PROTOCOL}://${envs.HOST}:${envs.PORT}`],
            },
          }),
          new webpack.HotModuleReplacementPlugin({ quiet: true }),
          new StartServerPlugin({
            name: 'index.js',
            keyboard: !isProd,
            nodeArgs,
          }),
        ]),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});

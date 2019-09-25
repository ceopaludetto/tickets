const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsFormatter = require('react-dev-utils/typescriptFormatter');
// const { GenerateSW } = require('workbox-webpack-plugin');

const envs = require('./envs');
const baseConfig = require('./webpack.config.base');

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig(false), {
  target: 'web',
  entry: [
    ...(isProd ? [] : ['razzle-dev-utils/webpackHotDevClient']),
    path.resolve('src', 'client', 'index.tsx'),
  ],
  optimization: {
    splitChunks: isProd
      ? {
          chunks: 'all',
        }
      : false,
    moduleIds: isProd ? 'hashed' : false,
    runtimeChunk: isProd
      ? {
          name: 'runtime',
        }
      : false,
  },
  output: {
    pathinfo: true,
    publicPath: isProd
      ? '/static/'
      : `http://${envs.HOST}:${envs.DEV_PORT}/static/`,
    path: path.resolve('dist', 'static'),
    libraryTarget: 'var',
    filename: isProd ? 'js/index.[contenthash:8].js' : 'index.js',
    chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : '[name].chunk.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.resourcePath).replace(/\\/g, '/'),
  },
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'none',
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    noInfo: true,
    overlay: false,
    // writeToDisk: true,
    publicPath: '/static/',
    host: envs.HOST,
    port: envs.DEV_PORT,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    before(app) {
      app.use(errorOverlayMiddleware());
    },
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    // eslint-disable-next-line @typescript-eslint/camelcase
    child_process: 'empty',
  },
  plugins: [
    ...(isProd
      ? [
          new webpack.HashedModuleIdsPlugin(),
          new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
          }),
          new CompressionPlugin({
            exclude: /\.map/,
            cache: true,
            minRatio: Number.MAX_SAFE_INTEGER,
          }),
          new CopyWebpackPlugin([
            {
              from: path.resolve('public'),
              to: path.resolve('dist', 'static', 'public'),
            },
          ]),
          // new GenerateSW({
          //   swDest: 'public/sw.js',
          //   exclude: [/\.map$/, /\.gz$/, /asset-manifest\.json$/],
          //   importWorkboxFrom: 'cdn',
          //   clientsClaim: true,
          //   runtimeCaching: [
          //     {
          //       urlPattern: /api/,
          //       handler: 'NetworkFirst',
          //     },
          //   ],
          //   navigateFallbackBlacklist: [
          //     new RegExp('^/_'),
          //     new RegExp('/[^/]+\\.[^/]+$'),
          //   ],
          // }),
        ]
      : [
          new webpack.HotModuleReplacementPlugin({
            multiStep: true,
          }),
          new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
          new ForkTsCheckerWebpackPlugin({
            async: true,
            tsconfig: path.resolve('src', 'client', 'tsconfig.json'),
            watch: ['./src'],
            typeCheck: true,
            formatter: tsFormatter,
            eslint: true,
            eslintOptions: {
              configFile: path.resolve('.eslintrc.js'),
            },
          }),
        ]),
    new LoadablePlugin({
      filename: 'manifest.json',
      writeToDisk: true,
    }),
    new ModuleNotFoundPlugin(path.resolve('src')),
  ],
});

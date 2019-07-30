const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const FriendlyErrorsPlugin = require('razzle-dev-utils/FriendlyErrorsPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssPlugin = require('mini-css-extract-plugin');
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
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          reuseExistingChunk: true,
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
        },
        common: {
          name: 'commons',
          reuseExistingChunk: true,
          chunks: 'all',
          test: /[\\/]src[\\/]client[\\/]components[\\/]/,
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
  output: {
    pathinfo: false,
    publicPath: '/static/',
    path: path.resolve('dist', 'static'),
    libraryTarget: 'var',
    filename: isProd ? 'js/index.[contenthash:8].js' : 'index.js',
    chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : '[name].chunk.js',
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
    writeToDisk: true,
    publicPath: '/assets/',
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
            minSizeReduce: 2,
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
          // new MiniCssPlugin({
          //   filename: isProd ? 'css/index.[contenthash:8].css' : 'index.css',
          //   chunkFilename: isProd
          //     ? 'css/[name].[contenthash:8].css'
          //     : '[name].css',
          // }),
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
          new webpack.HotModuleReplacementPlugin(),
          new FriendlyErrorsPlugin({
            verbose: false,
            target: 'web',
          }),
          new ForkTsCheckerWebpackPlugin({
            async: true,
            tsconfig: path.resolve('src', 'client', 'tsconfig.json'),
            watch: ['./src'],
            typeCheck: true,
            formatter: tsFormatter,
          }),
          new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
        ]),
    new LoadablePlugin({
      filename: 'manifest.json',
      writeToDisk: true,
    }),
    new webpack.WatchIgnorePlugin([
      path.resolve('dist', 'assets', 'manifest.json'),
    ]),
    new ModuleNotFoundPlugin(path.resolve('src')),
  ],
});

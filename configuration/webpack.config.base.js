/* eslint-disable global-require, @typescript-eslint/camelcase */
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const babelOptions = require('./babelOptions');

const envs = require('./envs');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (isServer = false) => ({
  bail: isProd,
  name: isServer ? 'Server' : 'Client',
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  mode: isProd ? 'production' : 'development',
  performance: false,
  watchOptions: {
    ignored: [/node_modules/, /dist/],
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        sourceMap: !isServer,
        cache: true,
        parallel: true,
        terserOptions: {
          keep_classnames: isServer,
          keep_fnames: isServer,
          output: {
            ecma: isServer ? 6 : 5,
            comments: false,
          },
          parse: {
            ecma: 8,
          },
          compress: {
            comparisons: true,
            inline: 2,
          },
          mangle: !isServer
            ? {
                safari10: true,
              }
            : null,
        },
      }),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: eslintFormatter,
          },
        },
        enforce: 'pre',
      },
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  configFile: false,
                  cacheDirectory: true,
                  cacheCompression: !isProd,
                  compact: !isProd,
                  ...babelOptions(isServer),
                },
              },
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: true,
                  configFile: path.resolve(
                    'src',
                    isServer ? 'server' : 'client',
                    'tsconfig.json'
                  ),
                },
              },
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.(gql|graphql)$/,
            exclude: /node_modules/,
            use: 'graphql-tag/loader',
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'assets/[name].[contenthash:8].[ext]',
              emitFile: !isServer,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      'webpack/hot/poll': require.resolve('webpack/hot/poll'),
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.gql', '.graphql', '.json'],
  },
  plugins: [
    ...(!isProd
      ? [
          new webpack.WatchIgnorePlugin([
            path.resolve('src', 'server', 'schema.gql'),
          ]),
        ]
      : []),
    new WebpackBar({
      name: isServer ? 'Server' : 'Client',
      color: isServer ? '#c065f4' : '#f56be2',
    }),
    new webpack.EnvironmentPlugin({
      PORT: envs.PORT,
      HOST: envs.HOST,
      TARGET: isServer ? 'server' : 'web',
      PUBLIC_PATH: '/static/',
      STATIC_FOLDER: path.resolve('dist', 'static'),
      MANIFEST: path.resolve('dist', 'static', 'manifest.json'),
      BASE_DIR: path.resolve('.'),
    }),
  ],
});

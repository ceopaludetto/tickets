/* eslint-disable global-require, @typescript-eslint/camelcase */
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
const LodashPlugin = require('lodash-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const babelOptions = require('./babelOptions');
const envs = require('./envs');

const isProd = process.env.NODE_ENV === 'production';

const postcssOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    ...[
      isProd
        ? require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.tsx'],
          })
        : [],
    ],
  ],
};

module.exports = (isServer = false) => ({
  bail: isProd,
  name: isServer ? 'Server' : 'Client',
  devtool: 'source-map',
  mode: isProd ? 'production' : 'development',
  performance: false,
  watchOptions: {
    ignored: [/node_modules/, /dist/],
  },
  optimization: {
    removeAvailableModules: isProd,
    removeEmptyChunks: isProd,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        sourceMap: isProd,
        cache: true,
        parallel: true,
        terserOptions: {
          safari10: !isServer,
          keep_classnames: isServer,
          keep_fnames: isServer,
          output: {
            ecma: isServer ? 8 : 5,
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
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            inline: false,
            annotation: true,
          },
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
              experimentalWatchApi: !isProd,
              configFile: path.resolve(`tsconfig.${isServer ? 'server' : 'client'}.json`),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          ...(isServer ? [] : [{ loader: MiniCssExtract.loader, options: { hmr: !isProd, reloadAll: !isProd } }]),
          'css-modules-types-generator-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              onlyLocals: isServer,
              modules: {
                localIdentName: isProd ? '_[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssOptions,
          },
          'sass-loader',
        ],
      },
      {
        loader: 'file-loader',
        exclude: [/\.(js|mjs|ts|tsx|scss|html|json)$/],
        options: {
          name: 'assets/[name].[contenthash:8].[ext]',
          emitFile: !isServer,
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      // lodash: 'lodash-es',
      'webpack/hot/poll': require.resolve('webpack/hot/poll'),
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json', '.scss'],
  },
  plugins: [
    ...(!isProd ? [new webpack.WatchIgnorePlugin([path.resolve('src', 'server', 'schema.gql')])] : []),
    new WebpackBar({
      name: isServer ? 'Server' : 'Client',
      color: isServer ? '#c065f4' : '#f56be2',
      profile: true,
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
    new LodashPlugin(),
  ],
});

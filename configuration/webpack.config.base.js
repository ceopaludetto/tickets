/* eslint-disable global-require, @typescript-eslint/camelcase */
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssPlugin = require('mini-css-extract-plugin');
// const postcssNormalize = require('postcss-normalize');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const safePostCssParser = require('postcss-safe-parser');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
// const purgecss = require('@fullhuman/postcss-purgecss')({
//   content: ['./src/**/*.tsx', './src/**/*.css'],
//   defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
// });
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
    removeAvailableModules: isProd,
    removeEmptyChunks: isProd,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        sourceMap: !isServer,
        cache: true,
        parallel: true,
        terserOptions: {
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
            : {
                keep_classnames: true,
                keep_fnames: true,
              },
        },
      }),
      // new OptimizeCSSAssetsPlugin({
      //   cssProcessorOptions: {
      //     parser: safePostCssParser,
      //     map: {
      //       inline: false,
      //       annotation: true,
      //     },
      //   },
      // }),
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
          // {
          //   test: /\.css$/,
          //   use: [
          //     // eslint-disable-next-line no-nested-ternary
          //     ...(!isServer
          //       ? isProd
          //         ? [MiniCssPlugin.loader]
          //         : ['style-loader']
          //       : []),
          //     'css-modules-types-generator-loader',
          //     {
          //       loader: 'css-loader',
          //       options: {
          //         modules: {
          //           localIdentName: isProd
          //             ? '_[hash:base64:4]'
          //             : '[name]__[local]--[hash:base64:4]',
          //         },
          //         importLoaders: 2,
          //         onlyLocals: isServer,
          //       },
          //     },
          //     {
          //       loader: 'postcss-loader',
          //       options: {
          //         ident: 'postcss',
          //         plugins: () => [
          //           require('tailwindcss'),
          //           require('postcss-flexbugs-fixes'),
          //           require('postcss-preset-env')({
          //             autoprefixer: {
          //               flexbox: 'no-2009',
          //             },
          //             stage: 3,
          //           }),
          //           postcssNormalize(),
          //           ...(isProd ? [purgecss] : []),
          //         ],
          //       },
          //     },
          //   ],
          // },
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
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss', '.json'],
  },
  plugins: [
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
    }),
  ],
});

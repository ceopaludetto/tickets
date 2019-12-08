/* eslint-disable @typescript-eslint/camelcase */
const path = require('path');
const glob = require('glob');
const NodeExternals = require('webpack-node-externals');

const babelOptions = require('./babelOptions');

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [NodeExternals()],
  entry: glob.sync(path.resolve('src', 'server', 'migrations', '*.ts')).reduce((entries, filename) => {
    const migrationName = path.basename(filename, '.ts');
    return { ...entries, [migrationName]: filename };
  }, {}),
  output: {
    path: path.resolve('tmp'),
    libraryTarget: 'commonjs2',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              ...babelOptions(true),
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: path.resolve('tsconfig.server.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
    extensions: ['.js', '.json', '.ts'],
  },
};

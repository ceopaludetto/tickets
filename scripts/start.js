// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === 'development';

const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const printErrors = require('razzle-dev-utils/printErrors');
const DevServer = require('webpack-dev-server');
const logger = require('razzle-dev-utils/logger');
const setPorts = require('razzle-dev-utils/setPorts');

const envs = require('../configuration/envs');
const clientConfig = require('../configuration/webpack.config.client');
const serverConfig = require('../configuration/webpack.config.server');

process.noDeprecation = true;

function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    printErrors('Failed to compile.', [e]);
    process.exit(1);
  }
  return compiler;
}

function main() {
  logger.start('Compiling...');

  fs.emptyDirSync(serverConfig.output.path);
  fs.emptyDirSync(path.resolve('logs'));

  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  let watching;

  clientCompiler.hooks.done.tap('done', () => {
    if (watching) return;

    watching = serverCompiler.watch(
      {
        quiet: true,
        stats: 'none',
      },
      () => {}
    );
  });

  const clientDevServer = new DevServer(clientCompiler, clientConfig.devServer);

  clientDevServer.listen(envs.DEV_PORT || 3001, err => {
    if (err) {
      logger.error(err);
    }
  });
}

setPorts()
  .then(main)
  // eslint-disable-next-line no-console
  .catch(console.error);

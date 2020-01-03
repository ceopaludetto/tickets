// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV === 'development';
process.noDeprecation = true;

process.env.INSPECT_BRK = process.argv.find(arg => arg.match(/--inspect-brk(=|$)/)) || '';
process.env.INSPECT = process.argv.find(arg => arg.match(/--inspect(=|$)/)) || '';

const fs = require('fs-extra');
const logger = require('razzle-dev-utils/logger');
const printErrors = require('razzle-dev-utils/printErrors');
const setPorts = require('razzle-dev-utils/setPorts');
const clearConsole = require('react-dev-utils/clearConsole');
const webpack = require('webpack');
const DevServer = require('webpack-dev-server');

const envs = require('../configuration/envs');
const clientConfig = require('../configuration/webpack.config.client');
const serverConfig = require('../configuration/webpack.config.server');

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
  clearConsole();
  logger.start('Compiling...');
  fs.emptyDirSync(serverConfig.output.path);

  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  let watching = null;

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

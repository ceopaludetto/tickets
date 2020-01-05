process.env.ONLY = 'server';
const clearConsole = require('react-dev-utils/clearConsole');

const fs = require('fs-extra');
const printErrors = require('razzle-dev-utils/printErrors');
const webpack = require('webpack');

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
  clearConsole();
  fs.emptyDirSync(serverConfig.output.path);

  const serverCompiler = compile(serverConfig);

  serverCompiler.watch(
    {
      quiet: true,
      stats: 'none',
    },
    () => {}
  );
}

main();

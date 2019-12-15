/* eslint-disable no-console */
const path = require('path');
const childProcess = require('child_process');
const { promisify } = require('util');

console.log('-> Running migrations');

const args = {
  env: 'development',
  cmd: 'db:migrate',
};

process.argv.forEach((argv, i, arr) => {
  if (i === 0) return;

  if (argv === '-e') {
    args.env = arr[i + 1];
  }

  if (argv === '-u') {
    if (arr[i + 1]) {
      args.cmd = `db:migrate:undo ${arr[i + 1]}`;
      console.log('--> Undoing ', arr[i + 1]);
    } else {
      console.log('XXX You need to pass an valid migration name');
    }
  }

  if (argv === '-ua') {
    args.cmd = 'db:migrate:undo:all';
    console.log('--> Undoing All');
  }
});

const { cmd, env } = args;
console.log('--> Env setted to', env);

const asyncExec = promisify(childProcess.exec);

async function boostrap() {
  try {
    console.log('--> Compiling...');
    await asyncExec(`webpack --config ${path.resolve('configuration', 'compileMigrations.js')}`);
    console.log('<-- Compiled successfully');

    console.log('--> Running sequelize cli');

    const { stdout } = await asyncExec(`sequelize ${cmd} - env ${env}`);
    console.log(stdout);

    console.log('--> Removing temporary folder...');

    await asyncExec(`rm -rf ${path.resolve('tmp')}`);

    console.log('<- All runned successfully');
  } catch (err) {
    throw new Error(err);
  }
}

boostrap();

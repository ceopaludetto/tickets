const path = require('path');
const jest = require('jest');

const envs = require('../configuration/envs');
const config = require('../jest.config');

process.env.NODE_ENV = 'test';
process.env.PORT = envs.PORT;
process.env.HOST = envs.HOST;
process.env.PUBLIC_PATH = '/static/';
process.env.STATIC_FOLDER = path.resolve('dist', 'static');
process.env.MANIFEST = path.resolve('dist', 'static', 'manifest.json');
process.env.BASE_DIR = path.resolve('.');

const args = ['--detectOpenHandles', '--forceExit'];

if (process.env.TARGET === 'server') {
  args.push('--config', JSON.stringify(config(true)));
} else {
  args.push('--config', JSON.stringify(config(false)));
}

jest.run(args);

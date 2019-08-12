const jest = require('jest');
const config = require('../jest.config');

const args = [];

if (process.env.TARGET === 'server') {
  args.push('--config', JSON.stringify(config(true)));
} else {
  args.push('--config', JSON.stringify(config(false)));
}

jest.run(args);

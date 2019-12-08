const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const glob = require('glob');

const configs = {};

const files = glob.sync(path.resolve('env', '.config.*.yaml'));
files.forEach(f => {
  const env = f.split('.')[2];
  const content = fs.readFileSync(f, 'utf8');
  configs[env] = yaml.parse(content).database;
});

module.exports = configs;

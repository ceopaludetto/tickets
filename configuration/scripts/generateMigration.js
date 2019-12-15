/* eslint-disable no-console */
const path = require('path');
const glob = require('glob');
const fs = require('fs');

console.log('-> Creating new Migration:', process.argv[2]);

const model = `
import SequelizeStatic, { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    // Write migration code here.
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof SequelizeStatic) {
    // If migration fails, this will be called. Rollback your migration changes.
  },
};
`.trim();

const migrationsPath = path.resolve('src', 'server', 'migrations');

const date = new Date();
const number = glob.sync(`${migrationsPath}/*.ts`).length + 1;
const format = `${date.getFullYear()}_${number}`;

fs.writeFileSync(`${migrationsPath}/${format}-${process.argv[2] || ''}.ts`, model);

console.log('<- Migration created successfully');

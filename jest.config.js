const { jsWithBabel: tsjPreset } = require('ts-jest/presets');

const babelGenConfig = require('./configuration/babelOptions');

module.exports = (isServer = false) => {
  const babelConfig = babelGenConfig(isServer, true);
  const tsConfig = require.resolve(`./src/${isServer ? 'server' : 'client'}/tsconfig.test.json`);

  return {
    testEnvironment: isServer ? 'node' : 'jsdom',
    moduleFileExtensions: ['js', 'ts', 'tsx', 'gql', 'graphql', 'json'],
    setupFilesAfterEnv: ['<rootDir>/__tests__/setupEnzyme.ts'],
    transform: {
      ...tsjPreset.transform,
      '\\.(gql|graphql)$': 'jest-transform-graphql',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    globals: {
      'ts-jest': {
        tsConfig,
        babelConfig,
      },
    },
    testMatch: [
      `<rootDir>/src/${isServer ? 'server' : 'client'}/(**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))`,
    ],
  };
};

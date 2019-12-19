const path = require('path');

const babelOptions = require('../configuration/babelOptions');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.stories\.(ts|tsx)?$/,
    use: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
          ...babelOptions(false),
        },
      },
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: path.resolve('tsconfig.client.json'),
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
      // Optional
      // {
      //   loader: require.resolve("react-docgen-typescript-loader")
      // }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");
  config.resolve.alias =  {
    '@': path.resolve('src'),
  };
  return config;
};

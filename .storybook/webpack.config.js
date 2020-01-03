const path = require("path");

const babelOptions = require("../configuration/babelOptions");

module.exports = ({ config }) => {
  config.devtool = 'source-map'

  config.module.rules.push({
    test: /\.stories\.(ts|tsx)?$/,
    use: [
      {
        loader: require.resolve("@storybook/source-loader"),
        options: { parser: "typescript" }
      }
    ],
    enforce: "pre"
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
          ...babelOptions(false)
        }
      },
      {
        loader: require.resolve("ts-loader"),
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: path.resolve("tsconfig.client.json")
        }
      }
    ]
  });
  config.module.rules.push({
    test: /\.s?css$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 2,
          sourceMap: true,
          modules: {
            localIdentName: "[path][name]__[local]--[hash:base64:5]"
          }
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
          ],
        }
      },
      "sass-loader"
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx", ".scss");
  config.resolve.alias = {
    "@": path.resolve("src")
  };
  return config;
};

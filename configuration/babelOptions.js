/* eslint-disable no-template-curly-in-string */
const isProd = process.env.NODE_ENV === 'production';

module.exports = (isServer = false, isTest = false) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        useBuiltIns: 'entry',
        shippedProposals: true,
        corejs: 3,
        exclude: ['transform-typeof-symbol'],
        targets: isServer
          ? {
              node: 'current',
              esmodules: true,
            }
          : { browsers: ['last 2 version', '> 0.25%', 'not ie <= 8', 'not dead'] },
      },
    ],
    [
      '@babel/preset-react',
      {
        useBuiltIns: true,
        development: !isProd,
      },
    ],
  ],
  plugins: [
    'lodash',
    '@loadable/babel-plugin',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements',
    [
      'babel-plugin-styled-components',
      {
        displayName: false,
      },
    ],
    [
      '@babel/plugin-transform-destructuring',
      {
        loose: true,
        selectiveLoose: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer',
          'useCallback',
          'useMemo',
          'useRef',
          'useImperativeHandle',
          'useLayoutEffect',
          'useDebugValue',
        ],
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-runtime', { corejs: false, regenerator: true }],
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    ['transform-react-remove-prop-types', { mode: 'remove', removeImport: true }],
    [
      'transform-imports',
      {
        'react-use': {
          transform: 'react-use/lib/${member}',
          preventFullImport: true,
        },
      },
    ],
    ...(isTest
      ? ['babel-plugin-dynamic-import-node', ['@babel/plugin-transform-modules-commonjs', { loose: true }]]
      : []),
  ],
});

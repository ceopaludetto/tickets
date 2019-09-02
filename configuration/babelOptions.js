const isProd = process.env.NODE_ENV === 'production';

module.exports = (isServer = false) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: isServer ? 'cjs' : false,
        useBuiltIns: 'entry',
        shippedProposals: true,
        corejs: 3,
        exclude: ['transform-typeof-symbol'],
        targets: isServer
          ? {
              node: 'current',
            }
          : null,
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
    '@loadable/babel-plugin',
    'graphql-tag',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements',
    [
      'styled-components',
      {
        displayName: !isProd,
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
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        regenerator: true,
      },
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ],
    [
      'transform-react-remove-prop-types',
      {
        mode: 'remove',
        removeImport: true,
      },
    ],
    [
      'transform-imports',
      {
        'react-use': {
          // eslint-disable-next-line no-template-curly-in-string
          transform: 'react-use/lib/${member}',
          preventFullImport: true,
        },
        ...(isServer
          ? {}
          : {
              'mdi-norm': {
                // eslint-disable-next-line no-template-curly-in-string
                transform: 'mdi-norm/es/${member}',
                preventFullImport: true,
                skipDefaultConversion: true,
              },
            }),
      },
    ],
  ],
});

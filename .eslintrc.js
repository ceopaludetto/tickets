const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true
    },
    ecmaVersion: 2019,
    sourceType: "module",
    projects: [
      path.resolve("tsconfig.client.json"),
      path.resolve("tsconfig.server.json")
    ]
  },
  plugins: ["import", "react", "react-hooks", "prettier"],
  rules: {
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-cycle": ["error", { maxDepth: 1 }],
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".jsx", ".tsx"]
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 120
      }
    ],
    "max-classes-per-file": ["error", 4],
    "no-return-await": 0,
    "no-useless-constructor": 0
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx", ".gql"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  }
};

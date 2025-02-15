{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "camelcase": "off",
    "consistent-return": "off",
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    "prettier/prettier": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".tsx"
        ]
      }
    ],
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
    ],
    "react/default-props-match-prop-types": "off",
    "react/jsx-curly-newline": "off",
    "react/display-name": "off",
    "react/no-unused-prop-types": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-nested-ternary": "off",
    "no-plusplus": "off",
    "react/no-children-prop": "off",
    "no-case-declarations": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-wrap-multilines": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/ban-types": [
      "off"
    ],
    "react/no-array-index-key": "off",
    "guard-for-in": "off",
    "no-restricted-syntax": "off",
    "react/jsx-key": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  plugins: ['node'],
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'no-console': 'off'
  }
};

module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
};

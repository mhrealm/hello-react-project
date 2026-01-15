module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'react-app/jest', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreUrls: true, // 忽略URL长度
        ignoreStrings: true, // 忽略字符串长度
        ignoreTemplateLiterals: true, // 忽略模板字符串长度
      },
    ],
  },
};

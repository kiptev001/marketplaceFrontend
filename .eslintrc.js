module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'next/core-web-vitals',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }], // 2 пробела для всех блоков кода, включая switch case
    'react/jsx-indent': ['error', 2], // 2 пробела для JSX
    'react/jsx-indent-props': ['error', 2], // 2 пробела для отступов пропсов в JSX
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off', // Next.js автоматически импортирует React
    'react/prop-types': 'off', // Отключить проверку prop-types, если используете TypeScript
  },
  settings: {
    react: {
      version: 'detect', // Автоматическое определение версии React
    },
  },
};

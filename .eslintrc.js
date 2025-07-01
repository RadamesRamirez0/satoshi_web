module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // Asegúrate de tener el path correcto aquí
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint-config-codely/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
    'plugin:@tanstack/query/recommended',
  ],
  plugins: ['react-hooks'],
  rules: {
    'prettier/prettier': ['error', { usePrettierrc: true, endOfLine: 'auto' }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    camelcase: 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^@?\\w', '^\\u0000'], // External libraries
          ['^.+\\.s?css$'], // SCSS files
          ['^@/lib', '^@/hooks'], // Libs and hooks
          ['^@/data'], // Static data
          ['^@/components', '^@/container'], // Components and containers
          ['^@/store'], // Store imports (e.g., Zustand)
          ['^@/'], // Other local imports
          ['^@/types'], // Type imports
          ['^'], // Anything else
        ],
      },
    ],
  },
};

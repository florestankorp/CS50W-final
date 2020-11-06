module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:react/recommended',
    ],
    settings: {
        react: {
            version: 'latest',
        },
    },
    rules: {},
};

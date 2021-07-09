module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/recommended',
        '@vue/typescript',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-console': 'off',
        indent: [2, 4, { SwitchCase: 1 }],
        'vue/html-indent': [2, 4],
        'vue/script-indent': [0, 4, { baseIndent: 0 }],
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 3,
                multiline: {
                    max: 1,
                    allowFirstLine: false,
                },
            },
        ],
    },
}

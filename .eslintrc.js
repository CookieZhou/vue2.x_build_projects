module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'indent': 'off',
        'vue/script-indent': [
            'error',
            4,
            {
                'baseIndent': 0
            }
        ],
        'space-before-function-paren': [0, 'always'],
        // 强制在注释中 // 或 /* 使用一致的空格
        'spaced-comment': 0,
        // always-multiline：多行模式必须带逗号，单行模式不能带逗号
        'comma-dangle': [1, 'never'],
        // 末尾禁止使用分号
        'no-mixed-spaces-and-tabs': [1, 'smart-tabs'],
        "semi": 0,
        "no-tabs": 0,
    }
}

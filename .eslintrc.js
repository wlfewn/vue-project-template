// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-multiple-empty-lines': 0,
    'no-tabs': 'off',
    // 允许多个空格
    'no-multi-spaces': 'off',
    // 末尾允许存在空格
    'no-trailing-spaces': 'off',
    // 可以使用new
    'no-new': 'off',
    // 允许必要的代码块
    'padded-blocks': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 0,
    // 禁止重复 import
    "space-before-function-paren": ["off", "always"],
    // 
    "no-unused-vars": [2, { 
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none" 
    }],
    // 关闭语句强制分号结尾
    "semi": [0],
    // 空行最多不能超过100行
    "no-multiple-empty-lines": [0, {"max": 100}],
    // 关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    // 必须使用全等
    "eqeqeq": 2,
    // 回调嵌套深度
    "max-nested-callbacks": [0, 2],
    'comma-dangle': 'off',
    // import 不需要都放在顶部
    'import/first': 'off'
  }
}

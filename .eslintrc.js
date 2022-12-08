module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/prop-name-casing': 'off',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-lone-template': 'off',
    camelcase: 'off'
  }
}

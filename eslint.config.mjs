import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  vue: true,
  root: true,
  typescript: true,

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript/recommended',
  ],

  env: {
    'vue/setup-compiler-macros': true,
  },

  ignores: ['*.md', '*.json', '*.yml', '*.yaml', '*.lock', 'dist', 'node_modules'],

  rules: {
    'antfu/top-level-function': 'off',

    'style/semi': 'off',
    '@typescript-eslint/no-redeclare': 'off',

    'antfu/no-top-level-await': 'off',

    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    'perfectionist/sort-imports': ['error', { tsconfigRootDir: '.' }],

    'no-console': ['error', { allow: ['info'] }],

    'accessor-pairs': 'off',

    'no-unreachable': 'error',

    'vue/no-use-v-if-with-v-for': 'off',

    '@typescript-eslint/no-explicit-any': 'error',

    'vue/valid-v-slot': 'off',

    'unicorn/prefer-node-protocol': 'off',

    'vue/multi-word-component-names': 'off',

    'vue/require-name-property': 'error',

    '@typescript-eslint/comma-dangle': 'off',

    '@typescript-eslint/eqeqeq': 'off',

    '@typescript-eslint/no-use-before-define': 'off',

    'no-alert': 'off',

    '@typescript-eslint/ban-ts-comment': 'error',

    'vue/no-template-shadow': 'error',

    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^(props|emits)$' }],

    'unused-imports/no-unused-vars': ['error', {
      vars: 'all',
      varsIgnorePattern: '^(props|emits|defineProps|defineEmits|defineExpose|withDefaults)$',
      args: 'after-used',
      argsIgnorePattern: '^_',
    }],

    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    'vue/singleline-html-element-content-newline': 'off',

    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],

    'style/brace-style': ['error', '1tbs'],

    'vue/v-on-event-hyphenation': 'off',
    'style/member-delimiter-style': 'off',
    'style/quote-props': 'off',
    'style/operator-linebreak': 'off',
    'antfu/if-newline': 'off',
  },
})

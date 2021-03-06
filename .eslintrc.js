// https://eslint.org/docs/user-guide/configuring
module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "rules": {
    "semi": 2
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
};

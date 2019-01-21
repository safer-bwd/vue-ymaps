const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@vue-ymaps': path.resolve(__dirname, '../src/')
      }
    }
  }
};

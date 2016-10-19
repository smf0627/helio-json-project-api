const ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (ENV !== 'production') {
  require('babel-core/register');
  require('babel-polyfill');
  module.exports = require('./src');
} else {
  require('babel-polyfill');
  module.exports = require('./dist');
}

module.exports = wallaby => ({
  
  files: [
    'src/**/*',
    'test/**/*',
    '!test/**/*.test.js'
  ],
  
  tests: [
    'test/**/*.test.js'
  ],
  
  env: {
    type: 'node'
  },
  
  testFramework: 'ava',
  
  setup() {
    require('babel-polyfill');
  },
  
  debug: true,
  
  compilers: {
    '**/*.js': wallaby.compilers.babel()
  }
  
});

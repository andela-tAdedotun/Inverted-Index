// Karma configuration
// Generated on Mon Mar 27 2017 17:28:24 GMT+0100 (WAT)

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    files: [
      'src/js/InvertedIndex.js',
      'spec/test_files/testFiles.js',
      'node_modules/jasmine-promises/dist/jasmine-promises.js',
      'spec/bundle.js',
    ],


    // list of files to exclude
    // exclude: [
    //   './coverage/'
    // ],


    // preprocess matching files before serving them to the browser
    /* available preprocessors:
     https://npmjs.org/browse/keyword/karma-preprocessor */
    preprocessors: {
      './src/js/InvertedIndex.js': ['coverage'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'coveralls', 'verbose'],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    /* possible values: config.LOG_DISABLE || config.LOG_ERROR
     || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG */
    logLevel: config.LOG_INFO,


    /* enable / disable
     watching file and executing tests whenever any file changes */
    autoWatch: true,


    // start these browsers
    /* available browser launchers:
        https://npmjs.org/browse/keyword/karma-launcher */
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};

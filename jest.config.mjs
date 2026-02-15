export default {
  testEnvironment: 'node',
  transform: {},
  verbose: true,
  injectGlobals: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js',
    'models/**/*.js',
    'lib/**/*.js'
  ],

  coverageDirectory: 'coverage',

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
};

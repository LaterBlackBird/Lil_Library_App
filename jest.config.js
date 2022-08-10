const {defaults} = require('jest-config');

module.exports = {
  name: "lil_library_app",
  verbose: true,
  testMatch: ["**/tests/**/*.test.js"],
  preset: 'jest-expo',
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'cjs', 'jsx', 'json', 'node'],
  moduleDirectories: ["node_modules"],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {},
  modulePaths: ["<rootDir>"],
  roots: ["<rootDir>"],
};

// export default {
//   rootDir: './',
//   testEnvironment: 'jest-environment-jsdom',
//   setupFiles: ['./jest.setup.js'],
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//   },
//   transformIgnorePatterns: ['/node_modules/'],
//   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
//   setupFilesAfterEnv: ['@testing-library/jest-dom'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1', // Existing mapping for @/ imports
//     '^src/(.*)$': '<rootDir>/src/$1', // Add mapping for src/ imports
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//     '\\.(mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
//     '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
//     '^src/services/Config$': '<rootDir>/__mocks__/Config.jsx',
//   },
// };

export default {
  rootDir: './',
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'], // Initial setup files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JavaScript and TypeScript files using Babel
  },
  transformIgnorePatterns: ['/node_modules/'], // Ignore node_modules except for transformations
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'], // Extensions Jest will look for
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js', // Ensure jest.setup.js runs after the environment is set up
    '@testing-library/jest-dom', // Add custom jest matchers for DOM nodes
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Map `@/` imports to `src/`
    '^src/(.*)$': '<rootDir>/src/$1', // Map `src/` imports to `src/`
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock stylesheets
    '\\.(mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js', // Mock media files
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image files
    '^src/services/Config$': '<rootDir>/__mocks__/Config.jsx', // Mock Config service
    "^react-quill$": "<rootDir>/__mocks__/react-quill.js",
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // Match files in `__tests__` directories
    '**/?(*.)+(spec|test).[tj]s?(x)', // Match test files with `.spec` or `.test` in the name
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'], // Ignore these directories during testing
};

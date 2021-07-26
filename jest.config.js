module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js'
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss|svg)$'
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^components(.*)$': '<rootDir>/components$1',
    '^pages(.*)$': '<rootDir>/pages$1',
    '^public(.*)$': '<rootDir>/public$1',
    '^utils(.*)$': '<rootDir>/utils$1',
    '^styles(.*)$': '<rootDir>/styles$1',
    '^context(.*)$': '<rootDir>/context$1'
  },
  testMatch: ['**/*.(test|spec).(js|jsx|ts|tsx)'],
  testEnvironment: 'jsdom'
}

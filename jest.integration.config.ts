// must be running your docker compose
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/sbdd?schema=public";
}

export default {
  clearMocks: true,
  collectCoverage: false,
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc:{
          parser:{
            syntax:'typescript',
            tsx: false,
            decorators: true,
          },
          target: 'es2017',
          keepClassNames: true,
          transform: {
            legacyDecorator:true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: 'es6',
          noInterop: false,
        },
      },
    ],
  },
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-node',
  coverageThreshold: {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  },
  testRegex: "\\.integration\\.test\\.ts$"
};

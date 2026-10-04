const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // @oss-compass/ui installs its own nested react@18 copy; map react
    // imports to the workspace root copy so component tests render with a
    // single React instance
    '^react$': '<rootDir>/../../node_modules/react',
    '^react-dom$': '<rootDir>/../../node_modules/react-dom',
    '^react/jsx-runtime$': '<rootDir>/../../node_modules/react/jsx-runtime',
    '^@oss-compass/graphql$': '<rootDir>/../../packages/graphql/src/index.ts',
    '^@oss-compass/ui$': '<rootDir>/../../packages/ui/src/index.tsx',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@components/(.*)$': '<rootDir>/src/common/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/common/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/src/common/hooks/$1',
    '^@graphql/(.*)$': '<rootDir>/src/graphql/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

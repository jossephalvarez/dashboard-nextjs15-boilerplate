const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // ✅ Incluye todos los archivos de código fuente
    '!src/**/*.d.ts', // ❌ Excluye archivos de definición de TypeScript
    '!src/**/index.{js,jsx,ts,tsx}', // ❌ Excluye archivos de barril
    '!src/**/__tests__/**', // ❌ Excluye los archivos de pruebas
    '!src/**/mocks/**', // ❌ Excluye mocks y configuraciones
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
};

module.exports = createJestConfig(config);

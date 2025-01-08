module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js', '**/__tests__/**/*.test.jsx', '**/__tests__/**/*.test.tsx'],
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  }
};
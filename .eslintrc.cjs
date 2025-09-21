module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'prettier'],
  settings: {
    next: {
      rootDir: ['apps/web']
    }
  },
  ignorePatterns: ['node_modules/', 'dist/', 'coverage/']
};

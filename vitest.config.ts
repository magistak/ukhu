import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/**/*.test.ts', 'packages/**/*.spec.ts'],
    coverage: {
      enabled: false
    }
  },
  resolve: {
    alias: {
      '@ukhu/i18n': path.resolve(__dirname, 'packages/i18n/src'),
      '@ukhu/cms-client': path.resolve(__dirname, 'packages/cms-client/src'),
      '@ukhu/checklists': path.resolve(__dirname, 'packages/checklists/src'),
      '@ukhu/firebase': path.resolve(__dirname, 'packages/firebase/src'),
      '@': path.resolve(__dirname, 'apps/web/src')
    }
  }
});

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl:
      'https://github-repositories-explorer-aslw36wqq-riadh180.vercel.app',
    specPattern: 'cypress/integration/**/*.cy.ts',
  },
});

// cypress/support/commands.ts

/// <reference types="Cypress" />

import { typeInSearch, clickSearch } from '../utils';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      performSearch(username: string): void;
      shouldDisplayUser(username: string): void;
      selectUser(username: string): void;
      interceptGraphQL(): void;
    }
  }
}

Cypress.Commands.add('performSearch', (username: string) => {
  typeInSearch(username);
  clickSearch();
});

Cypress.Commands.add('shouldDisplayUser', (username: string) => {
  cy.get('div.MuiPaper-root').contains(username).should('exist'); // Replace with the actual selector for user items
});

Cypress.Commands.add('selectUser', (username) => {
  cy.get('div.MuiPaper-root').contains(username).click(); // Replace with the actual selector for user items
});

Cypress.Commands.add('interceptGraphQL', () => {
  cy.intercept('POST', '/graphql', (req) => {
    if (req.body.operationName === 'GetUsers') {
      req.alias = 'gqlGetUsers';
    }
    if (req.body.operationName === 'GetRepositoriesForUser') {
      req.alias = 'gqlGetRepositoriesForUser';
    }
  });
});

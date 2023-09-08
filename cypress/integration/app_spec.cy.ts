// cypress/integration/app_spec.ts
import { typeInSearch, getSearchInput } from '../utils';  // Import your utility functions


/// <reference types="Cypress" />

describe('Application Context', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.interceptGraphQL();
  });

  it('renders search input and button', () => {
    getSearchInput().should('exist');
    cy.get('button').contains('Search').should('exist');
  });

  it('updates search input value', () => {
    typeInSearch('test-user');
    getSearchInput().should('have.value', 'test-user');
  });

  it('performs a search and displays users', () => {
    cy.performSearch('test-user');
    cy.wait('@gqlGetUsers').then((interception) => {
      const users = interception?.response?.body?.data?.search?.edges;
      expect(users).to.have.length.greaterThan(0);
      cy.shouldDisplayUser(users[0]?.node?.login);
    });
  });

  it('selects a user and displays repositories', () => {
    cy.performSearch('test-user');
    cy.wait('@gqlGetUsers').then((interception) => {

      const firstUser = interception?.response?.body?.data?.search?.edges?.[0]?.node?.login;
      cy.shouldDisplayUser(firstUser);
      cy.selectUser(firstUser);

      cy.wait('@gqlGetRepositoriesForUser').then((repoInterception) => {
        const repos = repoInterception?.response?.body?.data?.user?.repositories?.nodes;
        expect(repos).to.have.length.greaterThan(0);
        cy.get('[data-testid="repo-name-0"]').should('contain', repos[0]?.name);
        cy.get('[data-testid="repo-description-0"]').should('contain', repos[0]?.description);
      });
    });
  });
});

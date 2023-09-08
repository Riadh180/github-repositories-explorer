// cypress/utils.ts

/// <reference types="Cypress" />

export const getSearchInput = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get('input[placeholder="Enter Username"]');
  };
  
  export const typeInSearch = (text: string): void => {
    getSearchInput().type(text);
  };
  
  export const clickSearch = (): void => {
    cy.get('button').contains('Search').click();
  };
/// <reference types="cypress" />

it('intercepts', () => {
    cy.visit('https://pangie.vercel.app/blog')
    cy.intercept('POST', 'https://pangie.vercel.app/api/search', {fixture:'search.json'})
})
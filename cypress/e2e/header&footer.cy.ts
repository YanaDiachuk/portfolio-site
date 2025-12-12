/// <reference types="cypress" />

describe('Global Navigation / Header / Footer', () => {
  const pages = ['/', '/artworks', '/blog', '/contact', '/cart'];

  it('Header renders correctly with logo, nav links and cart on home', () => {
    cy.visit('/');

    cy.get('[data-cy="header"]').within(() => {
      cy.get('[data-cy="angie"]').should('be.visible');
      cy.get('[data-cy="artworks-btn"]').should('be.visible');
      cy.get('[data-cy="blog-btn"]').should('be.visible');
      cy.get('[data-cy="contact-btn"]').should('be.visible');
      cy.get('[data-cy="cart-btn"]').should('be.visible');
    });
  });

  it('Logo navigates to home from Blog page', () => {
    cy.visit('/blog');

    cy.get('[data-cy="angie"]').click();

    cy.location('pathname').should('eq', '/');
  });

  it('Navigation links lead to correct routes', () => {
    cy.visit('/');

    cy.get('[data-cy="artworks-btn"]').click();
    cy.location('pathname').should('eq', '/artworks');

    cy.get('[data-cy="blog-btn"]').click();
    cy.location('pathname').should('eq', '/blog');

    cy.get('[data-cy="contact-btn"]').click();
    cy.location('pathname').should('eq', '/contact');
  });

  it('Cart counter is visible in header on all pages', () => {
    pages.forEach((p) => {
      cy.visit(p);

      cy.get('[data-cy="header"]').within(() => {
        cy.get('[data-cy="cart-btn"]').should('be.visible');
      });
    });
  });

  it('Header is present on all major pages', () => {
    pages.forEach((p) => {
      cy.visit(p);
      cy.get('[data-cy="header"]').should('exist');
    });
  });

  it('Footer is present on all pages', () => {
    pages.forEach((p) => {
      cy.visit(p);
      cy.get('footer').should('exist');
    });
  });

  it('Mobile responsiveness — header layout is valid', () => {
    cy.viewport(390, 844); // iPhone 12
    cy.visit('/');

    cy.get('[data-cy="header"]').within(() => {
      cy.get('[data-cy="angie"]').should('be.visible');
      cy.get('[data-cy="artworks-btn"]').should('be.visible');
      cy.get('[data-cy="blog-btn"]').should('be.visible');
      cy.get('[data-cy="contact-btn"]').should('be.visible');
      cy.get('[data-cy="cart-btn"]').should('be.visible');
    });
  });
});

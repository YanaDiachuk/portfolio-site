/// <reference types="cypress" />
describe('Artworks add to cart', () => {
    it('adds all artworks to the cart', () => {
        cy.visit('/artworks')

        cy.get('[class="card relative"]').then(($cards) => {
            const artworksCount = $cards.length

            cy.wrap($cards).each(($card) => {
                cy.wrap($card)
                    .find('[data-cy="add-to-cart"]')
                    .click()
            })

            cy.visit('/cart')

            cy.get('ul').find('li').should('have.length', artworksCount)
        })
    })
})

describe('Blog filters', () => {
  const dateRanges = [
    { from: '2025-11-16', to: '2025-11-17', expectedPosts: 1 },
    { from: '2025-11-18', to: '2025-11-18', expectedPosts: 1 },
    { from: '2025-12-20', to: '2025-12-21', expectedPosts: 1 },
  ];

  dateRanges.forEach(({from, to, expectedPosts}) => {
    it(`should show correct posts for date range ${from} to ${to}`, () => {
      cy.visit('/blog');

      cy.get('[data-cy="from-date"]').clear().type(from);
      cy.get('[data-cy="to-date"]').clear().type(to);
      cy.get('[data-cy="apply-filters"]').contains('Apply').click();

      cy.get('article[class="card"]').should('have.length', expectedPosts);
    });
  });
});

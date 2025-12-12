/// <reference types="cypress" />

describe('Contact Form', () => {

  const validName = 'Anna'
  const validEmail = 'anna@test.com'
  const validMessage = 'Hello, I want to contact you.'

  beforeEach(() => {
    cy.visit('/contact')
  })

  // ---------------------------
  // POSITIVE SCENARIO
  // ---------------------------
  it('submits successfully with valid data', () => {
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { ok: true },
    }).as('contactApi')

    // Fill form
    cy.get('input[placeholder="Your name"]').type(validName)
    cy.get('input[placeholder="Email"]').type(validEmail)
    cy.get('textarea[placeholder="Message"]').type(validMessage)

    // Submit
    cy.get('[data-cy="send-btn"]').click()

    // API call validation
    cy.wait('@contactApi').its('request.body').should(body => {
      const parsed = JSON.parse(body)
      expect(parsed.name).to.eq(validName)
      expect(parsed.email).to.eq(validEmail)
      expect(parsed.message).to.eq(validMessage)
    })

    // UI success message
    cy.contains('Message sent!').should('be.visible')
  })

  // ---------------------------
  // VALIDATIONS
  // ---------------------------
  context('Validation errors', () => {

    it('prevents submit when email is empty', () => {
      cy.get('input[placeholder="Your name"]').type(validName)
      cy.get('textarea[placeholder="Your message"]').type(validMessage)

      cy.get('[data-cy="send-btn"]').click()

      cy.contains('Please enter a valid email').should('be.visible')
      cy.get('@contactApi').should('not.exist') // no network call
    })

    it('prevents submit when email is invalid', () => {
      cy.get('input[placeholder="Your name"]').type(validName)
      cy.get('input[placeholder="Email"]').type('wrong-email')
      cy.get('textarea[placeholder="Message"]').type(validMessage)

      cy.get('[data-cy="send-btn"]').click()

      cy.contains('Please enter a valid email').should('be.visible')
    })

    it('prevents submit when message is empty', () => {
      cy.get('input[placeholder="Your name"]').type(validName)
      cy.get('input[placeholder="Email"]').type(validEmail)

      cy.get('[data-cy="send-btn"]').click()

      cy.contains('Message must be at least 10 characters').should('be.visible')
    })

    it.skip('handles extremely long input gracefully', () => {
      const longText = 'xy'.repeat(5000)

      cy.get('input[placeholder="Your name"]').type(validName)
      cy.get('input[placeholder="Email"]').type(validEmail)
      cy.get('textarea[placeholder="Message"]').type(longText)

      cy.get('[data-cy="send-btn"]').click()

      // frontend allows long text as long as > 10 chars
      // API must still be called
    })
  })

  // ---------------------------
  //API ERRORS
  // ---------------------------
  context('API error handling', () => {

    it('shows error on 500 server error', () => {
      cy.intercept('POST', '/api/contact', {
        statusCode: 500
      }).as('contactApi')

      cy.get('input[placeholder="Your name"]').type(validName)
      cy.get('input[placeholder="Email"]').type(validEmail)
      cy.get('textarea[placeholder="Message"]').type(validMessage)

      cy.get('[data-cy="send-btn"]').click()

      cy.wait('@contactApi')

      cy.contains('Failed').should('be.visible')
    })

    it('handles 400 bad request (invalid parameters)', () => {
      cy.intercept('POST', '/api/contact', {
        statusCode: 400,
        body: { error: 'invalid_params' }
      }).as('contactApi')

      cy.get('input[placeholder="Your name"]').type(validName)
      cy.get('input[placeholder="Email"]').type(validEmail)
      cy.get('textarea[placeholder="Message"]').type(validMessage)

      cy.get('[data-cy="send-btn"]').click()

      cy.wait('@contactApi')

      cy.contains('Failed').should('be.visible')
    })
  })
})

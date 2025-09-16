const { Button } = require("reactstrap")

describe('Home Page Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Home Page Works, navigates to create an order page', () => {
    cy.getDataTest('welcome').should('contain.text', 'Welcome')
    cy.location("pathname").should("equal", "/")
    cy.getDataTest('create-button').click();
    cy.location("pathname").should("equal", "/create_order")
  })
  it('Navigates to the order form page', () => {
    cy.getDataTest('order-button').click();
    cy.location("pathname").should("equal", "/orders")
  })
  it('Navigates to the data form page', () => {
    cy.getDataTest('data-button').click();
    cy.location("pathname").should("equal", "/data")
  })
})
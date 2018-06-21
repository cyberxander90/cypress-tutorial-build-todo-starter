describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('focuses input on load', () => {
    cy.focused()
      .should('have.class', 'new-todo');
  })

  it('inputs texts', () => {
    const typedText = 'Buy Milk';

    cy.get('.new-todo')
      .type(typedText)
      .should('have.value', typedText);
  })
})
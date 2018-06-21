describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('properly displays completed items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Buy Eggs')
      .find('.toggle')
        .should('be.checked')
  })

  it('show remaining todos in the footer', () => {
    cy.get('.todo-count strong')
      .should('have.text', '3')
  })
})
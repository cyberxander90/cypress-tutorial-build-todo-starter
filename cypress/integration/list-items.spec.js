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

  it.only('remove a todo', () => {
    cy.route({
      url: '/api/todos/1',
      method: 'DELETE',
      status: 200,
      response: {}
    })

    cy.get('.todo-list li')
      .as('todo-list')
      .first()
      .find('.destroy')
      .invoke('show')
      .click()

    cy.get('@todo-list')
      .should('have.length', 3)
      .and('not.contain', 'Buy Milk')

    cy.get('@todo-list')
      .first()
      .should('contain', 'Buy Eggs')

  })
})
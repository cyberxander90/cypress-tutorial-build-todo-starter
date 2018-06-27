describe('Smoke test', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
  })

  context('With no todos', () => {
    it.only('Saves new todos', () => {
      cy.visit('/')

      // create an alias to the /api/todos POST request
      cy.server()
      cy.route('POST', '/api/todos')
        .as('create')

      cy.focused()
        .type('Buy milk{enter}')

      // wait for the request
      cy.wait('@create')

      cy.get('.todo-list li')
        .should('have.length', 1)
    })
  })
})
describe('Smoke test', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
  })

  context('With no todos', () => {
    it.only('Saves new todos', () => {
      const todos = [
        {text: 'Buy milk', expectedLength: 1},
        {text: 'Buy egg', expectedLength: 2},
        {text: 'Buy tomatoes', expectedLength: 3}
      ]

      cy.visit('/')

      // create an alias to the /api/todos POST request
      cy.server()
      cy.route('POST', '/api/todos')
        .as('create')

      cy.wrap(todos)
        .each((item) => {
          cy.focused()
            .type(item.text)
            .type('{enter}')

          // wait for the request
          cy.wait('@create')

          cy.get('.todo-list li')
            .should('have.length', item.expectedLength)
        })
    })
  })
})
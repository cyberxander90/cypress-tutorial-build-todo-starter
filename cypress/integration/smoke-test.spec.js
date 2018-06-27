describe('Smoke test', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(todo => cy.request('DELETE', `/api/todos/${todo.id}`))
  })

  context('With no todos', () => {
    it('Saves new todos', () => {
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

  context('With active todos', () => {
    beforeEach(() => {
      cy.fixture('todos')
        .each(todo => {
          const newTodo = Cypress._.merge(todo, {isComplete: false})
          cy.request('POST', '/api/todos', newTodo)
        })
      cy.visit('/')
    })

    it('Loads existing data from DB', () => {
      cy.get('.todo-list li')
        .should('have.length', 4)
    })

    it('Delete todos', () => {
      cy.server()
      cy.route('DELETE', '/api/todos/*')
        .as('delete')

      cy.get('.todo-list li')
        .each($el => {
          cy.wrap($el)
            .find('.destroy')
            .invoke('show')
            .click()

          cy.wait('@delete')
        })
        .should('not.exist')
    })

    it('Toggle todos', () => {
      const clickAndWait = ($el) => {
        cy.wrap($el)
          .as('item')
          .find('.toggle')
          .click()

        cy.wait('@update')
      }

      cy.server()
      cy.route('PUT', '/api/todos/*')
        .as('update')

      cy.get('.todo-list li')
        .each($el => {
          clickAndWait($el)          

          cy.get('@item')
            .should('have.class', 'completed')
        })
        .each($el => {
          clickAndWait($el)          

          cy.get('@item')
            .should('not.have.class', 'completed')
        })
    })
  })
})